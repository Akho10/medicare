package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.persistence.OrderRepository;
import com.medicare.persistence.UserRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
}
