package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
