package com.farmchain.trace.service;

import com.farmchain.finance.entity.Harvest;
import com.farmchain.trace.dto.ProduceBatchDto;
import com.farmchain.trace.dto.TraceResponseDto;
import com.farmchain.trace.dto.TraceabilityEventDto;
import com.farmchain.trace.entity.ProduceBatch;
import com.farmchain.trace.entity.TraceabilityEvent;
import com.farmchain.trace.repository.ProduceBatchRepository;
import com.farmchain.trace.repository.TraceabilityEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TraceabilityService {

    private final ProduceBatchRepository batchRepository;
    private final TraceabilityEventRepository eventRepository;
    private final BlockchainService blockchainService;
    private final com.farmchain.trace.repository.BlockchainTransactionRepository txRepository;
    private final com.farmchain.notification.service.NotificationService notificationService;

    @Transactional
    public void createBatchFromHarvest(Harvest harvest) {
        String qrCode = UUID.randomUUID().toString(); // Generate unique QR code

        ProduceBatch batch = ProduceBatch.builder()
                .farm(harvest.getPlan().getFarm())
                .harvest(harvest)
                .crop(harvest.getPlan().getCrop())
                .quantityKg(harvest.getActualQuantityKg())
                .qrCode(qrCode)
                .status("CREATED")
                .build();

        batch = batchRepository.save(batch);

        TraceabilityEvent event = TraceabilityEvent.builder()
                .batch(batch)
                .eventType("HARVESTED")
                .notes("Crop harvested at farm")
                .build();

        event = eventRepository.save(event);

        blockchainService.logEventToChain(event);
        
        notificationService.createNotification(
                harvest.getPlan().getFarm().getOwner(),
                "TRACEABILITY",
                "New produce batch created and queued for blockchain verification. QR Code: " + qrCode
        );
    }

    public List<ProduceBatchDto> getFarmBatches(UUID farmId) {
        return batchRepository.findByFarmIdOrderByCreatedAtDesc(farmId).stream()
                .map(batch -> ProduceBatchDto.builder()
                        .id(batch.getId())
                        .cropName(batch.getCrop().getName())
                        .quantityKg(batch.getQuantityKg())
                        .qrCode(batch.getQrCode())
                        .status(batch.getStatus())
                        .createdAt(batch.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public TraceResponseDto getTraceByQrCode(String qrCode) {
        ProduceBatch batch = batchRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new IllegalArgumentException("Batch not found for QR Code: " + qrCode));

        List<TraceabilityEventDto> events = eventRepository.findByBatchIdOrderByOccurredAtDesc(batch.getId()).stream()
                .map(e -> {
                    TraceabilityEventDto dto = TraceabilityEventDto.builder()
                        .eventType(e.getEventType())
                        .notes(e.getNotes())
                        .occurredAt(e.getOccurredAt())
                        .actorName(e.getActor() != null ? e.getActor().getFullName() : null)
                        .build();
                        
                    txRepository.findByEventId(e.getId()).ifPresent(tx -> {
                        dto.setTxHash(tx.getTxHash());
                        dto.setBlockchainNetwork(tx.getNetwork());
                    });
                    
                    return dto;
                })
                .collect(Collectors.toList());

        return TraceResponseDto.builder()
                .qrCode(batch.getQrCode())
                .cropName(batch.getCrop().getName())
                .quantityKg(batch.getQuantityKg())
                .farmState(batch.getFarm().getState())
                .farmDistrict(batch.getFarm().getDistrict())
                .batchCreatedAt(batch.getCreatedAt())
                .events(events)
                .build();
    }
}
