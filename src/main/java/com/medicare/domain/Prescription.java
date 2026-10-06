package com.medicare.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	//for user
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	private User user;
	
	//by admin
	@ManyToOne
	@JoinColumn(name="admin_id", nullable = false)
	private Admin admin;
	
	//medicine
	@OneToMany(mappedBy="prescription", cascade = CascadeType.ALL)
	private List<PrescriptionItem> prescriptionItems = new ArrayList<>();
	
	private String instructions;
	
	@Enumerated(EnumType.STRING)
	private PrescriptionStatus status;

}
