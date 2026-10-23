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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.medicare.domain.User;
import com.medicare.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@PostMapping("/login/{email}/{password}")
	public User login(@PathVariable String email, @PathVariable String password) {
		return userService.findByEmailAndPassword(email, password);
	}

	@PutMapping("update/{id}")
	public User updateProfile(@PathVariable long id, @RequestBody User user) {
		return userService.updateProfile(id, user);
	}

	@GetMapping("/{id}")
	public User findUserById(@PathVariable long id) {
		return userService.findUserById(id);
	}

	@GetMapping("list/{id}")
	public List<User> findAllUsers() {
		return userService.findAllUsers();
	}
}
