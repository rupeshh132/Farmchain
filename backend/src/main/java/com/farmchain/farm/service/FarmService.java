package com.farmchain.farm.service;

import com.farmchain.auth.entity.User;
import com.farmchain.farm.dto.FarmDto;
import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.entity.FarmMeasurement;
import com.farmchain.farm.entity.SoilProfile;
import com.farmchain.farm.repository.FarmMeasurementRepository;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.farm.repository.SoilProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FarmService {

    private final FarmRepository farmRepository;
    private final FarmMeasurementRepository measurementRepository;
    private final SoilProfileRepository soilProfileRepository;
    private final MeasurementService measurementService;

    @Transactional
    public FarmDto.FarmResponse createFarm(User owner, FarmDto.CreateFarmRequest request) {
        Farm farm = Farm.builder()
                .owner(owner)
                .farmName(request.getFarmName())
                .state(request.getState())
                .district(request.getDistrict())
                .village(request.getVillage())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();

        farm = farmRepository.save(farm);
        return mapToResponse(farm);
    }

    @Transactional(readOnly = true)
    public List<FarmDto.FarmResponse> getMyFarms(User owner) {
        return farmRepository.findByOwnerIdAndDeletedAtIsNull(owner.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public FarmDto.FarmResponse submitMeasurement(User owner, UUID farmId, FarmDto.SubmitMeasurementRequest request) {
        Farm farm = farmRepository.findByIdAndOwnerIdAndDeletedAtIsNull(farmId, owner.getId())
                .orElseThrow(() -> new IllegalArgumentException("Farm not found or not owned by user"));

        MeasurementService.MeasurementResult result = measurementService.calculateAreas(
                request.getLengthValue(),
                request.getWidthValue(),
                request.getInputUnit(),
                farm.getState(),
                request.getBighaVariant()
        );

        FarmMeasurement measurement = measurementRepository.findByFarmId(farmId).orElse(new FarmMeasurement());
        measurement.setFarm(farm);
        measurement.setLengthValue(request.getLengthValue());
        measurement.setWidthValue(request.getWidthValue());
        measurement.setInputUnit(request.getInputUnit());
        measurement.setAreaSqft(result.areaSqft());
        measurement.setAreaSqm(result.areaSqm());
        measurement.setAreaAcre(result.areaAcre());
        measurement.setAreaHectare(result.areaHectare());
        measurement.setAreaBigha(result.areaBigha());
        measurement.setBighaStateVariant(result.bighaStateVariant());

        measurementRepository.save(measurement);
        
        return mapToResponse(farm);
    }

    @Transactional
    public FarmDto.FarmResponse submitSoilProfile(User owner, UUID farmId, FarmDto.SubmitSoilProfileRequest request) {
        Farm farm = farmRepository.findByIdAndOwnerIdAndDeletedAtIsNull(farmId, owner.getId())
                .orElseThrow(() -> new IllegalArgumentException("Farm not found or not owned by user"));

        SoilProfile profile = soilProfileRepository.findByFarmId(farmId).orElse(new SoilProfile());
        profile.setFarm(farm);
        profile.setSoilType(request.getSoilType());
        profile.setPhValue(request.getPhValue());
        profile.setNitrogenLevel(request.getNitrogenLevel());
        profile.setPhosphorusLevel(request.getPhosphorusLevel());
        profile.setPotassiumLevel(request.getPotassiumLevel());
        profile.setIrrigationAvailable(request.getIrrigationAvailable());
        profile.setWaterSource(request.getWaterSource());

        soilProfileRepository.save(profile);

        return mapToResponse(farm);
    }

    private FarmDto.FarmResponse mapToResponse(Farm farm) {
        FarmDto.FarmResponse response = new FarmDto.FarmResponse();
        response.setId(farm.getId());
        response.setFarmName(farm.getFarmName());
        response.setState(farm.getState());
        response.setDistrict(farm.getDistrict());
        response.setVillage(farm.getVillage());
        response.setLatitude(farm.getLatitude());
        response.setLongitude(farm.getLongitude());

        measurementRepository.findByFarmId(farm.getId()).ifPresent(m -> {
            FarmDto.MeasurementResponse mr = new FarmDto.MeasurementResponse();
            mr.setId(m.getId());
            mr.setLengthValue(m.getLengthValue());
            mr.setWidthValue(m.getWidthValue());
            mr.setInputUnit(m.getInputUnit());
            mr.setAreaSqft(m.getAreaSqft());
            mr.setAreaSqm(m.getAreaSqm());
            mr.setAreaAcre(m.getAreaAcre());
            mr.setAreaHectare(m.getAreaHectare());
            mr.setAreaBigha(m.getAreaBigha());
            mr.setBighaStateVariant(m.getBighaStateVariant());
            response.setMeasurements(mr);
        });

        soilProfileRepository.findByFarmId(farm.getId()).ifPresent(s -> {
            FarmDto.SoilProfileResponse sr = new FarmDto.SoilProfileResponse();
            sr.setId(s.getId());
            sr.setSoilType(s.getSoilType());
            sr.setPhValue(s.getPhValue());
            sr.setNitrogenLevel(s.getNitrogenLevel());
            sr.setPhosphorusLevel(s.getPhosphorusLevel());
            sr.setPotassiumLevel(s.getPotassiumLevel());
            sr.setIrrigationAvailable(s.getIrrigationAvailable());
            sr.setWaterSource(s.getWaterSource());
            response.setSoilProfile(sr);
        });

        return response;
    }
}
