package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long>{

}
