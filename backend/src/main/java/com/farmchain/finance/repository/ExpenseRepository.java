package com.farmchain.finance.repository;

import com.farmchain.finance.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
    List<Expense> findByPlanIdOrderByIncurredAtDesc(UUID planId);
}
