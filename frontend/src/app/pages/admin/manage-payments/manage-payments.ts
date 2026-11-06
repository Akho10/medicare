import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Payment, PaymentService } from '../../../services/payment';

@Component({
  imports: [CommonModule],
  selector: 'app-manage-payments',
  styleUrl: './manage-payments.css',
  templateUrl: './manage-payments.html',
})
export class ManagePayments implements OnInit  {
  payments: Payment[] = [];
  errorMessage = '';

  constructor(
    private paymentService: PaymentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

   loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.errorMessage = '';
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.errorMessage = 'Could not load payments.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

}
