package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicare.domain.Medicine;
import com.medicare.domain.Order;
import com.medicare.domain.OrderItem;
import com.medicare.domain.OrderStatus;
import com.medicare.domain.Payment;
import com.medicare.domain.PaymentStatus;
import com.medicare.domain.Prescription;
import com.medicare.domain.PrescriptionItem;
import com.medicare.domain.PrescriptionStatus;
import com.medicare.persistence.MedicineRepository;
import com.medicare.persistence.OrderRepository;
import com.medicare.persistence.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private PrescriptionService prescriptionService;

	@Autowired
	private MedicineService medicineService;

	@Autowired
	private MedicineRepository medicineRepository;

	@Autowired
	private PaymentService paymentService;

	// placeOrder
	@Transactional
	public Order placeOrder(Long prescriptionId, double amount) {

		Prescription prescription = prescriptionService.findPrescriptionById(prescriptionId);

		if (prescription.getStatus() != (PrescriptionStatus.APPROVED)) {
			throw new RuntimeException("Prescription must be approved before placing an order.");
		}

		if (prescription.getPrescriptionItems().isEmpty()) {
			throw new RuntimeException("No medicines found in prescription.");
		}

		for (PrescriptionItem item : prescription.getPrescriptionItems()) {

			// check medicine
			Medicine medicine = medicineService.findMedicineById(item.getMedicine().getId());

			// check if the medicine that is prescription is less than actual medicine
			// quantity
			if (medicine.getQuantity() < item.getQuantity()) {
				throw new RuntimeException("Not enough stock for " + medicine.getName());
			}

//			medicine.setQuantity(medicine.getQuantity() - item.getQuantity());
//			
//			medicineRepository.save(medicine);
		}

		// pay
		Payment payment = new Payment();
		payment.setPrescription(prescription);
		payment.setAmount(amount);
		payment.setStatus(PaymentStatus.PENDING);

		paymentService.addPayment(payment);

		payment.setStatus(PaymentStatus.PAID);

		// reduce quantity
		for (PrescriptionItem item : prescription.getPrescriptionItems()) {

			// check medicine
			Medicine medicine = medicineService.findMedicineById(item.getMedicine().getId());

			// check if the medicine that is prescription is less than actual medicine
			// quantity
//			if(medicine.getQuantity() < item.getQuantity()) {
//				throw new RuntimeException("Not enough stock for " + medicine.getName());
//			}

			medicine.setQuantity(medicine.getQuantity() - item.getQuantity());

			medicineRepository.save(medicine);
		}

		// make order

		Order order = new Order();
		order.setUser(prescription.getUser());
		order.setOrderItems(order.getOrderItems());
		order.setTotalAmount(amount);
		order.setStatus(OrderStatus.COMPLETE);

		// create order items
		for (PrescriptionItem item : prescription.getPrescriptionItems()) {

			OrderItem orderItem = new OrderItem();
			
			orderItem.setOrder(order);
			orderItem.setMedicine(item.getMedicine());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setPrice(item.getMedicine().getPrice());
			
			order.getOrderItems().add(orderItem);
		}
		// save order
		return orderRepository.save(order);

	}

}
