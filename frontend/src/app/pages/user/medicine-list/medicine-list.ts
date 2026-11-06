import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medicine, MedicineService } from '../../../services/medicine';
import { finalize } from 'rxjs';

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

  constructor(
    private medicineService: MedicineService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';
    this.changeDetectorRef.markForCheck();

    this.medicineService.getMedicines().pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe({
      next: (data) => {
        this.medicines = data;
      },
      error: (error) => {
        console.error('Could not load medicines:', error);
        this.errorMessage = 'Could not load medicines. Please try again.';
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
    this.changeDetectorRef.markForCheck();

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

    request.pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe({
      next: (data) => {
        this.medicines = data;

        if (data.length === 0) {
          this.message = 'No medicines found.';
        }
      },
      error: (error) => {
        console.error('Medicine search failed:', error);
        this.errorMessage = 'Search failed. Please try again.';
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
