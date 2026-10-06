package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Admin;
import com.medicare.domain.User;

public interface AdminRepository extends JpaRepository<Admin, Long>{

	Admin findByEmail(String email);
}
