import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderItem {
  id: number;
  medicine: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private readonly orderUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(prescriptionId: number): Observable<Order> {
    const params = new HttpParams().set('prescriptionId', prescriptionId);

    return this.http.post<Order>(`${this.orderUrl}/add`,null,{ params });
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderUrl}/user/${userId}`);
  }
}
