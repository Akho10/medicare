import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface BrandOption {
  id: number;
  name: string;
}

export interface SymptomOption {
  id: number;
  name: string;
}

export interface Medicine {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  prescriptionNeeded: boolean;
  brand?: BrandOption;
  symptoms?: SymptomOption[];
}

export interface MedicineForm {
  name: string;
  description: string;
  price: number;
  quantity: number;
  prescriptionNeeded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
     private readonly medicineUrl = 'http://localhost:8080/medicines';
  private readonly brandUrl = 'http://localhost:8080/brands';
  private readonly symptomUrl = 'http://localhost:8080/symptoms';

  constructor(private http: HttpClient) {}

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.medicineUrl);
  }

  getBrands(): Observable<BrandOption[]> {
    return this.http.get<BrandOption[]>(`${this.brandUrl}/list`);
  }

  getSymptoms(): Observable<SymptomOption[]> {
    return this.http.get<SymptomOption[]>(`${this.symptomUrl}/list`);
  }
  addMedicine(
    medicine: MedicineForm,
    brandId: number,
    symptomIds: number[]
  ): Observable<Medicine> {

    let params = new HttpParams().set('brandId', brandId);

    symptomIds.forEach(id => {
      params = params.append('symptomIds', id);
    });

    return this.http.post<Medicine>(
      `${this.medicineUrl}/add`,
      medicine,
      { params }
    );
  }
   searchByName(name: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(
      `${this.medicineUrl}/search/name`,
      { params: { name } }
    );
  }

  searchByBrand(brandName: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(
      `${this.medicineUrl}/search/brand`,
      { params: { brandName } }
    );
  }

  searchBySymptom(symptomName: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(
      `${this.medicineUrl}/search/symptom`,
      { params: { symptomName } }
    );
  }

  searchByPrescription(prescriptionNeeded: boolean): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(
      `${this.medicineUrl}/search/prescription`,
      { params: { prescriptionNeeded } }
    );
  }
}
