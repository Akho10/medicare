package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Admin;
import com.medicare.domain.Brand;
import com.medicare.domain.Medicine;
import com.medicare.domain.Prescription;
import com.medicare.domain.PrescriptionItem;
import com.medicare.domain.PrescriptionStatus;
import com.medicare.domain.User;
import com.medicare.persistence.PrescriptionRepository;
import com.medicare.persistence.UserRepository;

@Service
public class PrescriptionService {

	@Autowired
	private PrescriptionRepository prescriptionRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private MedicineService medicineService;
	
	// add
	public Prescription addPrescription(long userId, long adminId, List<PrescriptionItem> items, String instructions) {
		//for a user, by admin
		User user = userService.findUserById(userId);
		
		Admin admin = adminService.findAdminById(adminId);
		
		Prescription prescription = new Prescription();
		prescription.setUser(user);
		prescription.setAdmin(admin);
		prescription.setPrescriptionItems(items);
		prescription.setInstructions(instructions);
		prescription.setStatus(PrescriptionStatus.PENDING);
		
		//check if prescription item exists
		for(PrescriptionItem item: items) {
			Medicine medicine= medicineService.findMedicineById(item.getMedicine().getId());
			
			item.setMedicine(medicine);
			item.setPrescription(prescription);
		}
		
		return prescriptionRepository.save(prescription);
	}

	// findbyId
	public Prescription findPrescriptionById(long id) {
		return prescriptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Prescription not found"));
	}
	
	//findUserPrescripiton
	public List<Prescription> findUserPrescription(long userId){
		return prescriptionRepository.findByUserId(userId);
	}

	// findAll
	public List<Prescription> findAllPrescriptions() {
		return prescriptionRepository.findAll();
	}
	// delete
	public void deletePrescription(long id) {
		prescriptionRepository.deleteById(id);
	}
	
	//APPROVE
	public Prescription approvePrescription(long id) {
		
		Prescription prescription = findPrescriptionById(id);
		prescription.setStatus(PrescriptionStatus.APPROVED);
		return prescriptionRepository.save(prescription);
	}
	//REJECT
	public Prescription rejectPrescription(long id) {
		
		Prescription prescription = findPrescriptionById(id);
		prescription.setStatus(PrescriptionStatus.REJECTED);
		return prescriptionRepository.save(prescription);
	}
}
