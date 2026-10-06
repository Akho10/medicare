package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long>{

}
