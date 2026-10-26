import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandOption, Medicine, MedicineForm, MedicineService, SymptomOption } from '../../../services/medicine';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-manage-medicines',
  styleUrl: './manage-medicines.css',
  templateUrl: './manage-medicines.html',
})
export class ManageMedicines implements OnInit{
  
   medicines: Medicine[] = [];
  brands: BrandOption[] = [];
  symptoms: SymptomOption[] = [];

  medicine: MedicineForm = this.createEmptyMedicine();

  selectedBrandId: number | null = null;
  selectedSymptomIds: number[] = [];

  searchType = 'name';
  searchValue = '';
  searchPrescriptionNeeded = true;

  message = '';
  errorMessage = '';

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.loadBrands();
    this.loadSymptoms();
  }

  private createEmptyMedicine(): MedicineForm {
    return {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      prescriptionNeeded: false
    };
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading medicines:', error);
        this.errorMessage = 'Could not load medicines.';
      }
    });
  }

  loadBrands(): void {
    this.medicineService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
        this.errorMessage = 'Could not load brands for the form.';
      }
    });
  }

  loadSymptoms(): void {
    this.medicineService.getSymptoms().subscribe({
      next: (data) => {
        this.symptoms = data;
      },
      error: (error) => {
        console.error('Error loading symptoms:', error);
        this.errorMessage = 'Could not load symptoms for the form.';
      }
    });
  }

  toggleSymptom(id: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedSymptomIds.includes(id)) {
        this.selectedSymptomIds.push(id);
      }
    } else {
      this.selectedSymptomIds =
        this.selectedSymptomIds.filter(symptomId => symptomId !== id);
    }
  }

  addMedicine(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.medicine.name.trim()) {
      this.errorMessage = 'Please enter a medicine name.';
      return;
    }

    if (this.medicine.price < 0 || this.medicine.quantity < 0) {
      this.errorMessage = 'Price and quantity cannot be negative.';
      return;
    }

    if (this.selectedBrandId === null) {
      this.errorMessage = 'Please select a brand.';
      return;
    }

    if (this.selectedSymptomIds.length === 0) {
      this.errorMessage = 'Please select at least one symptom.';
      return;
    }

    const newMedicine: MedicineForm = {
      ...this.medicine,
      name: this.medicine.name.trim(),
      description: this.medicine.description.trim()
    };

    this.medicineService.addMedicine(
      newMedicine,
      this.selectedBrandId,
      this.selectedSymptomIds
    ).subscribe({
      next: () => {
        this.message = 'Medicine added successfully!';
        this.medicine = this.createEmptyMedicine();
        this.selectedBrandId = null;
        this.selectedSymptomIds = [];

        this.loadMedicines();
      },
      error: (error) => {
        console.error('Error adding medicine:', error);
        this.errorMessage = 'Could not add medicine. Please check the backend error.';
      }
    });
  }

  searchMedicines(): void {
    this.message = '';
    this.errorMessage = '';

    const value = this.searchValue.trim();

    if (this.searchType !== 'prescription' && !value) {
      this.loadMedicines();
      return;
    }

    let request;

    switch (this.searchType) {
      case 'name':
        request = this.medicineService.searchByName(value);
        break;

      case 'brand':
        request = this.medicineService.searchByBrand(value);
        break;

      case 'symptom':
        request = this.medicineService.searchBySymptom(value);
        break;

      case 'prescription':
        request = this.medicineService.searchByPrescription(
          this.searchPrescriptionNeeded
        );
        break;

      default:
        this.loadMedicines();
        return;
    }

    request.subscribe({
      next: (data) => {
        this.medicines = data;
      },
      error: (error) => {
        console.error('Error searching medicines:', error);
        this.medicines = [];
        this.errorMessage = 'Could not find medicines matching your search.';
      }
    });
  }

  resetSearch(): void {
    this.searchValue = '';
    this.searchType = 'name';
    this.searchPrescriptionNeeded = true;
    this.loadMedicines();
  }

}
