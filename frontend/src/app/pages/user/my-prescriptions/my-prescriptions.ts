import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Prescription, PrescriptionService } from '../../../services/prescription';
import { AuthService } from '../../../services/auth';
import { OrderService } from '../../../services/order';

@Component({
  imports: [CommonModule],
  selector: 'app-my-prescriptions',
  styleUrl: './my-prescriptions.css',
  templateUrl: './my-prescriptions.html',
})
export class MyPrescriptions implements OnInit {
  prescriptions: Prescription[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  placingOrderId: number | null = null;

  constructor(
    private prescriptionService: PrescriptionService,
    private authService: AuthService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

loadPrescriptions(): void {
  const account = this.authService.getAccount();

  if (!account || !account.id) {
    this.errorMessage = 'Please log in to view your prescriptions.';
    this.loading = false;
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  this.prescriptionService.getUserPrescriptions(account.id).subscribe({
    next: (data) => {
      this.prescriptions = data;
      this.loading = false;
      console.log('Prescriptions loaded:', data);
    },
    error: (error) => {
      console.error('Error loading prescriptions:', error);
      this.errorMessage =
        error.status === 0
          ? 'Cannot connect to the backend. Check that Spring Boot is running.'
          : `Failed to load prescriptions. HTTP status: ${error.status}`;

      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}

  approvePrescription(id: number): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.prescriptionService.approvePrescription(id).subscribe({
      next: () => {
        this.successMessage = 'Prescription approved successfully.';
        this.loadPrescriptions();
      },
      error: (error) => {
        console.error('Error approving prescription:', error);
        this.errorMessage = 'Could not approve the prescription.';
      }
    });
  }

  rejectPrescription(id: number): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.prescriptionService.rejectPrescription(id).subscribe({
      next: () => {
        this.successMessage = 'Prescription rejected successfully.';
        this.loadPrescriptions();
      },
      error: (error) => {
        console.error('Error rejecting prescription:', error);
        this.errorMessage = 'Could not reject the prescription.';
      }
    });
  }

  placeOrder(prescriptionId: number): void {
  this.errorMessage = '';
  this.successMessage = '';
  this.placingOrderId = prescriptionId;

  this.orderService.placeOrder(prescriptionId).subscribe({
    next: (order) => {
      this.successMessage =
        `Order #${order.id} placed successfully. Total: R${order.totalAmount.toFixed(2)}`;

      this.placingOrderId = null;
      this.loadPrescriptions();
    },
    error: (error) => {
      console.error('Error placing order:', error);

      this.errorMessage =
        error.error?.message ||
        'Could not place the order. Please try again.';

      this.placingOrderId = null;
    }
  });
}
}
