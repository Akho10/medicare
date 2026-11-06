import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Symptom {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
    private readonly apiUrl = '/api/symptoms';

  constructor(private http: HttpClient) {}

  getSymptoms(): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${this.apiUrl}/list`);
  }

  addSymptom(symptom: Symptom): Observable<Symptom> {
    return this.http.post<Symptom>(`${this.apiUrl}/add`, symptom);
  }

  getSymptomById(id: number): Observable<Symptom> {
    return this.http.get<Symptom>(`${this.apiUrl}/${id}`);
  }
}
