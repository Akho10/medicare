package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Admin;
import com.medicare.domain.User;
import com.medicare.persistence.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;
	
	
	//register
	public Admin registerAdmin(Admin admin) {
		
		if(admin.getEmail() == null) {
			throw new RuntimeException("User already exists.");
		}
		return adminRepository.save(admin);
	}
	
	//findById
	public Admin findAdminById(long id) {
		return adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
	}
	
	//findByEmail/login
	public Admin findByEmail(String email, String password) {
		
		Admin admin = adminRepository.findByEmail(email);
		
		if(admin.getEmail().equals(email)) {
			throw new RuntimeException("Admin not found.");
		}
		
		if(!admin.getPassword().equals(password)) {
			throw new RuntimeException("Incorrect password.");
		}
		
		return admin;
	}
	
	//update profile/admin
	public Admin updateProfile(long id,Admin admin) {
		Admin a =findAdminById(id);
		a.setFirstName(admin.getFirstName());
		a.setLastName(admin.getLastName());
		
		return adminRepository.save(admin);
		
		
	}
	
	//changePassword
	public Admin changePassowrd(long id, String oldPassword, String newPassword) {
		Admin a =findAdminById(id);
		
		if(!a.getPassword().equals(oldPassword)) {
			throw new RuntimeException("Incorrect old password");
			
		}
		a.setPassword(newPassword);
		return adminRepository.save(a);
	}
	
}
