package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Brand;
import com.medicare.domain.Payment;
import com.medicare.domain.PaymentStatus;
import com.medicare.domain.PrescriptionStatus;
import com.medicare.persistence.PaymentRepository;
import com.medicare.persistence.UserRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	public Payment addPayment(Payment payment) {
		payment.setStatus(PaymentStatus.PENDING);
		return paymentRepository.save(payment);
	}

	// failed
	public Payment failedPayment(Payment payment) {

		payment.setStatus(PaymentStatus.FAILED);
		return paymentRepository.save(payment);
	}

	public List<Payment> listAllPayments() {
		return paymentRepository.findAll();
	}
}
