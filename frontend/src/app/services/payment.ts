import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface Payment {
  id: number;
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  prescription?: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    private apiUrl = '/api/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/list`);
  }
}
