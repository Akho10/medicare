package com.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.Admin;
import com.medicare.domain.User;
import com.medicare.service.AdminService;
import com.medicare.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("/register")
	public Admin registerUser(@RequestBody Admin admin) {
		return adminService.registerAdmin(admin);
	}

	@PostMapping("/login/{email}/{password}")
	public Admin login(@PathVariable String email, @PathVariable String password) {
		return adminService.findByEmail(email, password);
	}

	@PutMapping("update/{id}")
	public Admin updateProfile(@PathVariable long id, @RequestBody Admin admin) {
		return adminService.updateProfile(id, admin);
	}

	@GetMapping("/{id}")
	public Admin findAdminById(@PathVariable long id) {
		return adminService.findAdminById(id);
	}

	// @GetMapping("/{id}")
	// public List<Admin> findAllAdmins(){
	// return adminService.fi
	// }

	@PutMapping("changePassword/{id}")
	public Admin changePassowrd(@PathVariable long id, @RequestParam String oldPassword,
			@RequestParam String newPassword) {
		return adminService.changePassowrd(id, oldPassword, newPassword);
	}
}
