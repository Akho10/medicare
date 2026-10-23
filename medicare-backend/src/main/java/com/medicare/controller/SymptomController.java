package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Symptom;
import com.medicare.service.SymptomService;

@RestController
@RequestMapping("/symptoms")
@CrossOrigin(origins = "http://localhost:4200")
public class SymptomController {

	@Autowired
	private SymptomService symptomService;

	@PostMapping("/add")
	public Symptom addSymptom(@RequestBody Symptom symptom) {
		return symptomService.addSymptom(symptom);
	}

	@GetMapping("/list")
	public List<Symptom> findAllSymptoms() {
		return symptomService.findAllSymptoms();
	}

	// findById
	@GetMapping("/{id}")
	public Symptom findSymptomById(@PathVariable long id) {
		return symptomService.findSymptomById(id);
	}
}
