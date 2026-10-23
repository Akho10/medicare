package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Medicine;
import com.medicare.service.MedicineService;

@RestController
@RequestMapping("/medicines")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicineController {

	@Autowired
	private MedicineService medicineService;

	@PostMapping("/add")
	public Medicine addMedicine(@RequestBody Medicine medicine, @RequestParam long brandId,
			@RequestParam List<Long> symptomIds) {
		return medicineService.addMedicine(medicine, brandId, symptomIds);
	}

	@GetMapping
	public List<Medicine> findAllMedicines() {
		return medicineService.findAllMedicines();
	}

	@GetMapping("/{id}")
	public Medicine findMedicineById(long id) {
		return medicineService.findMedicineById(id);
	}

	@GetMapping("/search/name")
	public List<Medicine> searchByName(@RequestParam String name) {

		return medicineService.searchByName(name);
	}

	@GetMapping("/search/brand")
	public List<Medicine> searchByBrandName(@RequestParam String brandName) {

		return medicineService.searchByBrandName(brandName);
	}

	@GetMapping("/search/symptom")
	public List<Medicine> searchBySymptomName(@RequestParam String symptomName) {

		return medicineService.searchBySymptomName(symptomName);
	}

	@GetMapping("/search/prescription")
	public List<Medicine> searchByPrescriptionNeeded(@RequestParam boolean prescriptionNeeded) {

		return medicineService.searchByPrescriptionNeeded(prescriptionNeeded);
	}

}
