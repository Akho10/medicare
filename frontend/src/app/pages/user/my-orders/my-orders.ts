import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../../../services/order';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [CommonModule],
  selector: 'app-my-orders',
  styleUrl: './my-orders.css',
  templateUrl: './my-orders.html',
})
export class MyOrders implements OnInit{
  
  orders: Order[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const account = this.authService.getAccount();

    if (!account || !account.id) {
      this.errorMessage = 'Please log in to view your orders.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.orderService.getUserOrders(account.id).subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);

        this.errorMessage =
          error.status === 0
            ? 'Cannot connect to the backend. Please check that Spring Boot is running.'
            : `Failed to load orders. HTTP status: ${error.status}`;

        this.loading = false;
      }
    });
  }
}
