package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.persistence.MedicineRepository;
import com.medicare.persistence.UserRepository;

@Service
public class MedicineService {

	@Autowired
	private MedicineRepository medicineRepository;
}
