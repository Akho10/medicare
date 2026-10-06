package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

}
