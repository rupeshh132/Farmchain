package com.farmchain.market.repository;

import com.farmchain.market.entity.Market;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MarketRepository extends JpaRepository<Market, UUID> {
    List<Market> findByStateIgnoreCase(String state);
}
