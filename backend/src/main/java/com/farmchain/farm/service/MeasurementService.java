package com.farmchain.farm.service;

import com.farmchain.farm.entity.StateUnitConversion;
import com.farmchain.farm.repository.StateUnitConversionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeasurementService {

    private final StateUnitConversionRepository stateUnitConversionRepository;

    private static final BigDecimal SQFT_PER_SQM = new BigDecimal("10.76391041671");
    private static final BigDecimal SQFT_PER_ACRE = new BigDecimal("43560.0");
    private static final BigDecimal SQM_PER_HECTARE = new BigDecimal("10000.0");

    public MeasurementResult calculateAreas(BigDecimal length, BigDecimal width, String inputUnit, String state, String variantName) {
        BigDecimal areaSqft;
        BigDecimal areaSqm;

        if ("feet".equalsIgnoreCase(inputUnit)) {
            areaSqft = length.multiply(width);
            areaSqm = areaSqft.divide(SQFT_PER_SQM, 2, RoundingMode.HALF_UP);
        } else if ("meter".equalsIgnoreCase(inputUnit)) {
            areaSqm = length.multiply(width);
            areaSqft = areaSqm.multiply(SQFT_PER_SQM);
        } else {
            throw new IllegalArgumentException("Invalid input unit. Must be 'feet' or 'meter'.");
        }

        BigDecimal areaAcre = areaSqft.divide(SQFT_PER_ACRE, 4, RoundingMode.HALF_UP);
        BigDecimal areaHectare = areaSqm.divide(SQM_PER_HECTARE, 4, RoundingMode.HALF_UP);

        BigDecimal areaBigha = null;
        String appliedVariant = null;

        if (state != null) {
            Optional<StateUnitConversion> conversionOpt;
            if (variantName != null && !variantName.isEmpty()) {
                conversionOpt = stateUnitConversionRepository.findByStateAndVariantName(state, variantName);
            } else {
                // Default to first variant if state is provided but variant is not specified
                conversionOpt = stateUnitConversionRepository.findByState(state).stream().findFirst();
            }

            if (conversionOpt.isPresent()) {
                StateUnitConversion conversion = conversionOpt.get();
                areaBigha = areaSqft.divide(conversion.getSqftPerUnit(), 4, RoundingMode.HALF_UP);
                appliedVariant = conversion.getVariantName();
            }
        }

        return new MeasurementResult(
                areaSqft.setScale(2, RoundingMode.HALF_UP),
                areaSqm.setScale(2, RoundingMode.HALF_UP),
                areaAcre,
                areaHectare,
                areaBigha,
                appliedVariant
        );
    }

    public record MeasurementResult(
            BigDecimal areaSqft,
            BigDecimal areaSqm,
            BigDecimal areaAcre,
            BigDecimal areaHectare,
            BigDecimal areaBigha,
            String bighaStateVariant
    ) {}
}
