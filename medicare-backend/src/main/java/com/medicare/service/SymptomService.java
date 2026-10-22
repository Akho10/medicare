package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Medicine;
import com.medicare.domain.Symptom;
import com.medicare.persistence.SymptomRepository;

@Service
public class SymptomService {

	@Autowired
	private SymptomRepository symptomRepository;
	
	//add
	public Symptom addSymptom(Symptom symptom) {
		return symptomRepository.save(symptom);
	}
	
	//listAll
	public List<Symptom> findAllSymptoms() {
		return symptomRepository.findAll();
	}
	
	//findById
	public Symptom findSymptomById(long id) {
		return symptomRepository.findById(id).orElseThrow(() -> new RuntimeException("Symptom not found."));
	}
	
	//searchByName
//	public List<Medicine> searchByName(String name){
//		
//		return symptomRepository.searchMedicineByNameContainingIgnoreCase(name);
//	}
}
