package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Prescription;
import com.medicare.domain.PrescriptionItem;
import com.medicare.domain.PrescriptionStatus;
import com.medicare.service.PrescriptionService;

@RestController
@RequestMapping("/prescriptions")
@CrossOrigin(origins = "http://localhost:4200")
public class PrescriptionController {

	@Autowired
	private PrescriptionService prescriptionService;

	@PostMapping("/add")
	public Prescription addPrescription(long userId, long adminId, List<PrescriptionItem> items, String instructions) {
		return prescriptionService.addPrescription(userId, adminId, items, instructions);
	}

	@GetMapping("/{id}")
	public Prescription findPrescriptionById(@PathVariable long id) {
		return prescriptionService.findPrescriptionById(id);
	}

	@GetMapping("user/{userId}")
	public List<Prescription> findUserPrescription(@PathVariable long userId) {
		return prescriptionService.findUserPrescription(userId);
	}

	@GetMapping("/list")
	public List<Prescription> findAllPrescriptions() {
		return prescriptionService.findAllPrescriptions();
	}

	@DeleteMapping("delete/{id}")
	public void deletePrescription(@PathVariable long id) {
		prescriptionService.deletePrescription(id);
	}

	@PutMapping("{id}/approve")
	public Prescription approvePrescription(@PathVariable long id) {
		return prescriptionService.approvePrescription(id);

	}

	@PutMapping("{id}/reject")
	public Prescription rejectPrescription(@PathVariable long id) {
		return prescriptionService.rejectPrescription(id);

	}
}
