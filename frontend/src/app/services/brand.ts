import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface Brand {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
    private readonly apiUrl = 'http://localhost:8080/brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/list`);
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.apiUrl}/add`, brand);
  }

 searchBrand(name: string): Observable<Brand> {
    return this.http.get<Brand>(
      `${this.apiUrl}/search`,
      { params: { name } }
    );
  }

  deleteBrand(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}
