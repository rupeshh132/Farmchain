package com.farmchain.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequestDto {
    private String category;
    private BigDecimal amount;
    private LocalDate incurredAt;
}
