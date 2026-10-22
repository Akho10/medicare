package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Brand;
import com.medicare.domain.Symptom;
import com.medicare.service.BrandService;
import com.medicare.service.SymptomService;

@RestController
@RequestMapping("/brands")
public class BrandController {

	@Autowired
	private BrandService brandService;
	
	@PostMapping("/add")
	public Brand addSymptom(@RequestBody Brand brand) {
		return brandService.addBrand(brand);
	}
	
	@GetMapping("/list")
	public List<Brand> findAllBrands() {
		return brandService.findAllBrands();
	}
	
	@GetMapping("/{id}")
	public Brand findBrandById(@PathVariable long id) {
		return brandService.findBrandById(id);
	}
	
	@DeleteMapping("delete/{id}")
	public String deleteBrand(@PathVariable long id) {
		brandService.deleteBrand(id);
		return "Brand deleted successfully!";
	}
	
	@GetMapping("/search")
	public Brand searchByName(@RequestParam String name) {
		return brandService.searchByName(name);
	}
	
}
