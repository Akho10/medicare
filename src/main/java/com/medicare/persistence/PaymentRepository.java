package com.medicare.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.domain.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
