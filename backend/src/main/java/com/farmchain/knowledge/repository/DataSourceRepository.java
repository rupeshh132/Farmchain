package com.farmchain.knowledge.repository;

import com.farmchain.knowledge.entity.DataSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DataSourceRepository extends JpaRepository<DataSource, UUID> {
    Optional<DataSource> findByName(String name);
}
