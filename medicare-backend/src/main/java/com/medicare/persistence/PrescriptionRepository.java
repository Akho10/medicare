package com.medicare.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long>{

	List<Prescription> findByUserId(long userId);
}
