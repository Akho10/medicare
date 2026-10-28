import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface PrescriptionUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PrescriptionMedicine {
  id: number;
  name: string;
  price: number;
  quantity: number;
  prescriptionNeeded: boolean;
}

export interface PrescriptionLine {
  medicineId: number;
  quantity: number;
  instructions: string;
}

export interface PrescriptionItemRequest {
  medicine: {
    id: number;
  };
  quantity: number;
  instructions: string;
}

export interface Prescription {
  id?: number;
  user?: PrescriptionUser;
  admin?: { id: number };
  prescriptionItems?: {
    id?: number;
    medicine?: PrescriptionMedicine;
    quantity: number;
    instructions: string;
  }[];
  instructions?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
    private userUrl = 'http://localhost:8080/users';
  private medicineUrl = 'http://localhost:8080/medicines';
  private prescriptionUrl = 'http://localhost:8080/prescriptions';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<PrescriptionUser[]> {
    return this.http.get<PrescriptionUser[]>(
      `${this.userUrl}`
    );
  }

  getMedicines(): Observable<PrescriptionMedicine[]> {
    return this.http.get<PrescriptionMedicine[]>(
      this.medicineUrl
    );
  }
   getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(
      `${this.prescriptionUrl}/list`
    );
  }

  addPrescription(
    userId: number,
    adminId: number,
    items: PrescriptionItemRequest[],
    instructions: string
  ): Observable<Prescription> {

    const params = new HttpParams()
      .set('userId', userId)
      .set('adminId', adminId)
      .set('instructions', instructions);

    return this.http.post<Prescription>(
      `${this.prescriptionUrl}/add`,
      items,
      { params }
    );
  }
  getUserPrescriptions(userId: number): Observable<Prescription[]> {
  return this.http.get<Prescription[]>(
    `${this.prescriptionUrl}/user/${userId}`
  );
}

approvePrescription(id: number): Observable<Prescription> {
  return this.http.put<Prescription>(
    `${this.prescriptionUrl}/${id}/approve`,
    {}
  );
}

rejectPrescription(id: number): Observable<Prescription> {
  return this.http.put<Prescription>(
    `${this.prescriptionUrl}/${id}/reject`,
    {}
  );
}
}
