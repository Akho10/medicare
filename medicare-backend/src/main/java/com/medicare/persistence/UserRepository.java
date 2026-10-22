package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByEmail(String email);

}
