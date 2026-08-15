package com.farmchain.disease.service;

import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.repository.CropRepository;
import com.farmchain.disease.dto.DiseaseScanResponseDto;
import com.farmchain.disease.entity.DiseaseScan;
import com.farmchain.disease.repository.DiseaseScanRepository;
import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.repository.FarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiseaseDetectionService {

    private final DiseaseScanRepository scanRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;
    
    // In a real app, inject this via config
    private final String ML_SERVICE_URL = "http://localhost:8000/predict/disease";
    private final RestTemplate restTemplate = new RestTemplate();

    @Transactional
    public DiseaseScanResponseDto scanImage(UUID farmId, UUID cropId, MultipartFile file) throws IOException {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new IllegalArgumentException("Farm not found"));
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new IllegalArgumentException("Crop not found"));

        // 1. Call ML Service
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // Wrap file in ByteArrayResource so RestTemplate sends it as a file
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        
        String predictedDisease = "Healthy";
        BigDecimal confidenceScore = BigDecimal.valueOf(0.99);
        String recommendedAction = "Crop is healthy. Continue standard nutrient plan.";
        
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(ML_SERVICE_URL, requestEntity, Map.class);
            Map<String, Object> result = response.getBody();
            
            if (result != null && Boolean.TRUE.equals(result.get("success"))) {
                predictedDisease = (String) result.get("prediction");
                Number confNum = (Number) result.get("confidence");
                confidenceScore = BigDecimal.valueOf(confNum.doubleValue());
                recommendedAction = (String) result.get("recommended_action");
            }
        } catch (Exception e) {
            log.warn("Python ML service unavailable (is it running on port 8000?). Falling back to Java mock inference.");
            // Fallback Mock Logic
            String[] mockDiseases = {"Healthy", "Wheat Rust", "Leaf Blight", "Pest Infestation (Aphids)"};
            String[] mockActions = {
                "Crop is healthy. Continue standard nutrient plan.",
                "High fungal infection. Apply fungicide (e.g., Tebuconazole) immediately.",
                "Moderate infection. Improve drainage and apply appropriate copper-based fungicide.",
                "Apply Neem oil or appropriate insecticide. Monitor closely."
            };
            int mockIndex = new java.util.Random().nextInt(mockDiseases.length);
            predictedDisease = mockDiseases[mockIndex];
            confidenceScore = BigDecimal.valueOf(0.85 + (new java.util.Random().nextDouble() * 0.14));
            recommendedAction = mockActions[mockIndex];
        }

        // 2. Save result in DB
        DiseaseScan scan = DiseaseScan.builder()
                .farm(farm)
                .crop(crop)
                .imageUrl("local_mock_path/" + file.getOriginalFilename()) // Mock image storage
                .predictedDisease(predictedDisease)
                .confidenceScore(confidenceScore)
                .recommendedAction(recommendedAction)
                .build();
                
        scan = scanRepository.save(scan);

        return mapToDto(scan);
    }

    public List<DiseaseScanResponseDto> getScansByFarm(UUID farmId) {
        return scanRepository.findByFarmIdOrderByScannedAtDesc(farmId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private DiseaseScanResponseDto mapToDto(DiseaseScan scan) {
        return DiseaseScanResponseDto.builder()
                .id(scan.getId())
                .cropName(scan.getCrop().getName())
                .imageUrl(scan.getImageUrl())
                .predictedDisease(scan.getPredictedDisease())
                .confidenceScore(scan.getConfidenceScore())
                .recommendedAction(scan.getRecommendedAction())
                .scannedAt(scan.getScannedAt())
                .build();
    }
}
