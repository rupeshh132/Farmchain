package com.farmchain.farm.repository;

import com.farmchain.farm.entity.StateUnitConversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StateUnitConversionRepository extends JpaRepository<StateUnitConversion, UUID> {
    List<StateUnitConversion> findByState(String state);
    Optional<StateUnitConversion> findByStateAndVariantName(String state, String variantName);
}
