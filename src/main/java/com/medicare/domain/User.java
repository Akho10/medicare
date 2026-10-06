package com.medicare.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class User {

	private long id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String phone;
	
//	//user can have one or more symptoms/medical conditions
//	private List<Symptom> symptoms = new ArrayList<>();
	
	//user can have many prescriptions
//	private List<Prescription> prescriptions = new ArrayList<>();
//	private List<Order> orders = new ArrayList<>();
	
	
	
}
