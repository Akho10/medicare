import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medicine, MedicineService } from '../../../services/medicine';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-medicine-list',
  styleUrl: './medicine-list.css',
  templateUrl: './medicine-list.html',
})
export class MedicineList implements OnInit{
 medicines: Medicine[] = [];

  searchName = '';
  searchBrand = '';
  searchSymptom = '';
  prescriptionFilter = '';

  message = '';
  errorMessage = '';
  loading = false;

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Could not load medicines:', error);
        this.errorMessage = 'Could not load medicines. Please try again.';
        this.loading = false;
      }
    });
  }

   search(): void {
    this.message = '';
    this.errorMessage = '';

    if (this.searchName.trim()) {
      this.runSearch('name');
    } else if (this.searchBrand.trim()) {
      this.runSearch('brand');
    } else if (this.searchSymptom.trim()) {
      this.runSearch('symptom');
    } else if (this.prescriptionFilter !== '') {
      this.runSearch('prescription');
    } else {
      this.loadMedicines();
    }
  }

  private runSearch(type: string): void {
    this.loading = true;

    let request;

    switch (type) {
      case 'name':
        request = this.medicineService.searchByName(this.searchName.trim());
        break;

      case 'brand':
        request = this.medicineService.searchByBrand(this.searchBrand.trim());
        break;

      case 'symptom':
        request = this.medicineService.searchBySymptom(this.searchSymptom.trim());
        break;

      default:
        request = this.medicineService.searchByPrescription(
          this.prescriptionFilter === 'true'
        );
    }

    request.subscribe({
      next: (data) => {
        this.medicines = data;
        this.loading = false;

        if (data.length === 0) {
          this.message = 'No medicines found.';
        }
      },
      error: (error) => {
        console.error('Medicine search failed:', error);
        this.errorMessage = 'Search failed. Please try again.';
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchName = '';
    this.searchBrand = '';
    this.searchSymptom = '';
    this.prescriptionFilter = '';
    this.loadMedicines();
  }
}
