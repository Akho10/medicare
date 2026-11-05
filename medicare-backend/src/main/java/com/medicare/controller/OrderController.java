package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Order;
import com.medicare.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping("/add")
	public Order placeOrder(@RequestParam Long prescriptionId) {
		return orderService.placeOrder(prescriptionId);
	}

	@GetMapping("/user/{userId}")
	public List<Order> getUserOrders(@PathVariable Long userId) {

		return orderService.getUserOrders(userId);
	}
}
