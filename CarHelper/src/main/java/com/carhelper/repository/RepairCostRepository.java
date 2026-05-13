package com.carhelper.repository;

import com.carhelper.model.RepairCostRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairCostRepository extends JpaRepository<RepairCostRecord, Long> {
}