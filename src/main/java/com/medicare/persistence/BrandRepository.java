package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long>{

}
