package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Order;
import com.medicare.domain.Payment;
import com.medicare.domain.PaymentStatus;
import com.medicare.service.OrderService;
import com.medicare.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/add")
	public Payment addPayment(@RequestBody Payment payment) {
		return paymentService.addPayment(payment);
	}

	@PutMapping
	public Payment failedPayment(@RequestBody Payment payment) {

		return paymentService.failedPayment(payment);

	}

	@GetMapping("/list")
	public List<Payment> listAllPayments() {
		return paymentService.listAllPayments();
	}

}
