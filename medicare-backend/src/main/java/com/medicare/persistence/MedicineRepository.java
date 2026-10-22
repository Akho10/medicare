package com.medicare.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Medicine;
import com.medicare.domain.Symptom;

public interface MedicineRepository extends JpaRepository<Medicine, Long>{

	List<Medicine> searchMedicineByNameContainingIgnoreCase(String name);
	
//	List<Medicine> searchMedicineByNameAndBrandAndSymptomContainingIgnoreCase(String name, String brand, List<String> symptoms);
	
	List<Medicine> searchBrandByNameContainingIgnoreCase(String brandName);
	List<Medicine> searchSymptomsByNameContainingIgnoreCase(String symptomName);
	
	List<Medicine> findByPrescriptionNeeded(boolean prescriptionNeeded);
	
}
