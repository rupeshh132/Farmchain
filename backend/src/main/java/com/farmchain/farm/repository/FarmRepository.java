package com.farmchain.farm.repository;

import com.farmchain.farm.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmRepository extends JpaRepository<Farm, UUID> {
    List<Farm> findByOwnerIdAndDeletedAtIsNull(UUID ownerId);
    Optional<Farm> findByIdAndOwnerIdAndDeletedAtIsNull(UUID id, UUID ownerId);
}
