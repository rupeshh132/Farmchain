package com.farmchain.finance.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class ExpenseDto {
    private UUID id;
    private String category;
    private BigDecimal amount;
    private LocalDate incurredAt;
}
