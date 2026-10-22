package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Brand;
import com.medicare.persistence.BrandRepository;

@Service
public class BrandService {

	@Autowired
	private BrandRepository brandRepository;

	// add
	public Brand addBrand(Brand brand) {
		return brandRepository.save(brand);
	}

	// findbyId
	public Brand findBrandById(long id) {
		return brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Brand not found"));
	}

	// findAll
	public List<Brand> findAllBrands() {
		return brandRepository.findAll();
	}
	// delete
	public void deleteBrand(long id) {
		brandRepository.deleteById(id);
	}
	
	//searchByName
	public Brand searchByName(String name) {
		return brandRepository.searchBrandByNameContainingIgnoreCase(name);
	}
}
