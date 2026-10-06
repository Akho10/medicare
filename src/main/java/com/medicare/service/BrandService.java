package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.persistence.BrandRepository;

@Service
public class BrandService {

	@Autowired
	private BrandRepository brandRepository;
}
