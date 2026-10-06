package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.persistence.PaymentRepository;
import com.medicare.persistence.UserRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;
}
