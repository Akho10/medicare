package com.medicare.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Brand;
import com.medicare.domain.Medicine;

public interface BrandRepository extends JpaRepository<Brand, Long>{

	Brand searchBrandByNameContainingIgnoreCase(String name);
}
