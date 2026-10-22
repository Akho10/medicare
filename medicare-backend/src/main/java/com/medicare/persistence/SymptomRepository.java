package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Symptom;

public interface SymptomRepository extends JpaRepository<Symptom, Long>{

	
}
