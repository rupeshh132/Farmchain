package com.farmchain.trace.service;

import com.farmchain.trace.entity.BlockchainTransaction;
import com.farmchain.trace.entity.TraceabilityEvent;
import com.farmchain.trace.repository.BlockchainTransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlockchainService {

    private final BlockchainTransactionRepository transactionRepository;

    /**
     * Simulates logging an event to the blockchain.
     * In a real application, this would use Web3j to call a smart contract method.
     */
    @Async
    @Transactional
    public void logEventToChain(TraceabilityEvent event) {
        log.info("Initiating blockchain transaction for event: {}", event.getId());

        try {
            // Simulate network delay for transaction submission
            Thread.sleep(2000);
            
            // Generate a mock transaction hash
            String mockTxHash = "0x" + UUID.randomUUID().toString().replace("-", "") + 
                              UUID.randomUUID().toString().replace("-", "").substring(0, 32);

            BlockchainTransaction tx = BlockchainTransaction.builder()
                    .event(event)
                    .txHash(mockTxHash)
                    .network("Polygon Amoy Testnet")
                    .status("CONFIRMED") // Simulating instant confirmation for MVP
                    .confirmedAt(Instant.now())
                    .build();

            transactionRepository.save(tx);
            log.info("Successfully logged event {} to blockchain. TxHash: {}", event.getId(), mockTxHash);

        } catch (InterruptedException e) {
            log.error("Blockchain submission interrupted", e);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error("Failed to submit blockchain transaction", e);
        }
    }
}
