package com.farmchain.market.repository;

import com.farmchain.market.entity.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MarketPriceRepository extends JpaRepository<MarketPrice, UUID> {

    @Query("SELECT mp FROM MarketPrice mp WHERE mp.crop.id = :cropId AND mp.market.state = :state ORDER BY mp.priceDate DESC")
    List<MarketPrice> findLatestByCropAndState(@Param("cropId") UUID cropId, @Param("state") String state);
}
