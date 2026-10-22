package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Brand;
import com.medicare.domain.Medicine;
import com.medicare.domain.Symptom;
import com.medicare.persistence.MedicineRepository;
import com.medicare.persistence.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class MedicineService {

	@Autowired
	private MedicineRepository medicineRepository;
	
	@Autowired
	private BrandService brandService;
	
	@Autowired
	private SymptomService symptomService;
	
	//add
	@Transactional
	public Medicine addMedicine(Medicine medicine, long brandId, List<Long> symptomIds) {
		
		//ceck if brand exists
		Brand brand = brandService.findBrandById(brandId);
		
		List<Symptom> symptoms = symptomIds.stream()
				.map(id -> symptomService.findSymptomById(id))
				.toList();
		
		medicine.setBrand(brand);
		medicine.setSymptoms(symptoms);
		
		return medicineRepository.save(medicine);
	}
	
	//listAll
	public List<Medicine> findAllMedicines() {
		return medicineRepository.findAll();
	}
	
	//findById
	public Medicine findMedicineById(long id) {
		return medicineRepository.findById(id).orElseThrow(() -> new RuntimeException("Medicine not found."));
	}
	
	//searchByName
	public List<Medicine> searchByName(String name){
		
		return medicineRepository.searchMedicineByNameContainingIgnoreCase(name);
	}
	
	//search by brand 
	public List<Medicine> searchByBrandName(String brandName){
		
		return medicineRepository.searchBrandByNameContainingIgnoreCase(brandName);
	}
	
	//search by sypmtom
	public List<Medicine> searchBySymptomName(String symptomName){
		
		return medicineRepository.searchSymptomsByNameContainingIgnoreCase(symptomName);
	}
	//search by prescription needed
	public List<Medicine> searchByPrescriptionNeeded(boolean prescriptionNeeded){
		
		return medicineRepository.findByPrescriptionNeeded(prescriptionNeeded);
	}
}
