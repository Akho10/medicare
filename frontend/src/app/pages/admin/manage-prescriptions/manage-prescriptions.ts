import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prescription, PrescriptionItemRequest, PrescriptionLine, PrescriptionMedicine, PrescriptionService, PrescriptionUser } from '../../../services/prescription';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-manage-prescriptions',
  styleUrl: './manage-prescriptions.css',
  templateUrl: './manage-prescriptions.html',
})
export class ManagePrescriptions implements OnInit{
users: PrescriptionUser[] = [];
  medicines: PrescriptionMedicine[] = [];
  prescriptions: Prescription[] = [];

  selectedUserId = 0;
  adminId = 0;
  selectedMedicineId = 0;

  instructions = '';
  medicineLines: PrescriptionLine[] = [];

  message = '';
  errorMessage = '';
  loading = false;

  constructor(
    private prescriptionService: PrescriptionService,
     private authService: AuthService
  ) {}

  ngOnInit(): void {

      const account = this.authService.getAccount();

      this.adminId = Number(account?.id || 0);

    this.loadUsers();
    this.loadMedicines();
    this.loadPrescriptions();
  }

  loadUsers(): void {
    this.prescriptionService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Could not load users:', error);
        this.errorMessage =
          'Could not load users. Check your users API endpoint.';
      }
    });
  }

  loadMedicines(): void {
    this.prescriptionService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
      },
      error: (error) => {
        console.error('Could not load medicines:', error);
        this.errorMessage = 'Could not load medicines.';
      }
    });
  }

  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data) => {
        this.prescriptions = data;
      },
      error: (error) => {
        console.error('Could not load prescriptions:', error);
      }
    });
  }

  addMedicine(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.selectedMedicineId) {
      this.errorMessage = 'Please select a medicine.';
      return;
    }

    const alreadyAdded = this.medicineLines.some(
      item => item.medicineId === this.selectedMedicineId
    );

    if (alreadyAdded) {
      this.errorMessage =
        'This medicine has already been added.';
      return;
    }

    const medicine = this.medicines.find(
      item => item.id === this.selectedMedicineId
    );

    if (!medicine) {
      this.errorMessage = 'Medicine not found.';
      return;
    }

    if (medicine.quantity < 1) {
      this.errorMessage = 'This medicine is out of stock.';
      return;
    }

    this.medicineLines.push({
      medicineId: medicine.id,
      quantity: 1,
      instructions: ''
    });

    this.selectedMedicineId = 0;
  }

  getMedicine(id: number): PrescriptionMedicine | undefined {
    return this.medicines.find(item => item.id === id);
  }

  removeMedicine(medicineId: number): void {
    this.medicineLines = this.medicineLines.filter(
      item => item.medicineId !== medicineId
    );
  }

  createPrescription(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.selectedUserId) {
      this.errorMessage = 'Please select a user.';
      return;
    }

    if (!this.adminId || this.adminId < 1) {
      this.errorMessage = 'Please enter your admin ID.';
      return;
    }

    if (this.medicineLines.length === 0) {
      this.errorMessage =
        'Please add at least one medicine.';
      return;
    }

    for (const item of this.medicineLines) {
      const medicine = this.getMedicine(item.medicineId);

      if (!medicine) {
        this.errorMessage = 'One of the medicines is invalid.';
        return;
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        this.errorMessage =
          'Each medicine quantity must be at least 1.';
        return;
      }

      if (item.quantity > medicine.quantity) {
        this.errorMessage =
          `Only ${medicine.quantity} units of ${medicine.name} are available.`;
        return;
      }
    }

    const items: PrescriptionItemRequest[] =
      this.medicineLines.map(item => ({
        medicine: { id: item.medicineId },
        quantity: item.quantity,
        instructions: item.instructions
      }));

    this.loading = true;

    this.prescriptionService.addPrescription(
      this.selectedUserId,
      this.adminId,
      items,
      this.instructions
    ).subscribe({
      next: (response) => {
        this.loading = false;
        this.message =
          `Prescription #${response.id} created successfully. Status: PENDING.`;

        this.selectedUserId = 0;
        this.instructions = '';
        this.medicineLines = [];
        this.selectedMedicineId = 0;

        this.loadPrescriptions();
      },
      error: (error) => {
        this.loading = false;
        console.error('Could not create prescription:', error);

        this.errorMessage =
          error.error?.message ||
          'Could not create prescription. Check the backend console.';
      }
    });
  }
}
