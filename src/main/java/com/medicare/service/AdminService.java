package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.persistence.AdminRepository;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;
}
