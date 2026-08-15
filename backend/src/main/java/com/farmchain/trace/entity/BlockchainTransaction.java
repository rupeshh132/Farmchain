package com.farmchain.trace.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "blockchain_transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlockchainTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "traceability_event_id", nullable = false)
    private TraceabilityEvent event;

    @Column(name = "tx_hash", nullable = false, length = 100)
    private String txHash;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String network = "Polygon Amoy Testnet";

    @Column(length = 20)
    @Builder.Default
    private String status = "PENDING";

    @Column(name = "submitted_at", updatable = false)
    @Builder.Default
    private Instant submittedAt = Instant.now();

    @Column(name = "confirmed_at")
    private Instant confirmedAt;
}
