package com.medicare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.User;
import com.medicare.persistence.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	//register
	public User registerUser(User user) {
		
		if(user.getEmail() == null) {
			throw new RuntimeException("User already exists.");
		}
		return userRepository.save(user);
	}
	
	//findById
	public User findUserById(long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}
	
	//findByEmail/login
	public User findByEmail(String email, String password) {
		
		User user = userRepository.findByEmail(email);
		
		if(user.getEmail().equals(email)) {
			throw new RuntimeException("User not found.");
		}
		
		if(!user.getPassword().equals(password)) {
			throw new RuntimeException("Incorrect password.");
		}
		
		return user;
	}
	
	//update profile/user
	public User updateProfile(long id,User user) {
		User u =findUserById(id);
		u.setFirstName(user.getFirstName());
		u.setLastName(user.getLastName());
		u.setPhone(user.getPhone());
		
		return userRepository.save(user);
		
		
	}
	
	//listAll
	public List<User> findAllUsers(){
		return userRepository.findAll();
	}
	
}
