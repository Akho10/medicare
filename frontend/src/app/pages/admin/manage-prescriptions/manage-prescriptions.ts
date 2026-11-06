import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prescription, PrescriptionItemRequest, PrescriptionLine, PrescriptionMedicine, PrescriptionService, PrescriptionUser } from '../../../services/prescription';
import { AuthService } from '../../../services/auth';
import { finalize } from 'rxjs';

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
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
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
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Could not load users:', error);
        this.errorMessage =
          'Could not load users. Check your users API endpoint.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  loadMedicines(): void {
    this.prescriptionService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Could not load medicines:', error);
        this.errorMessage = 'Could not load medicines.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Could not load prescriptions:', error);
        this.errorMessage = 'Could not load prescriptions.';
        this.changeDetectorRef.markForCheck();
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
    this.changeDetectorRef.markForCheck();

    this.prescriptionService.addPrescription(
      this.selectedUserId,
      this.adminId,
      items,
      this.instructions
    ).pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe({
      next: (response) => {
        this.message =
          `Prescription #${response.id} created successfully. Status: PENDING.`;

        this.selectedUserId = 0;
        this.instructions = '';
        this.medicineLines = [];
        this.selectedMedicineId = 0;

        this.changeDetectorRef.markForCheck();
        this.loadPrescriptions();
      },
      error: (error) => {
        console.error('Could not create prescription:', error);

        this.errorMessage =
          error.error?.message ||
          'Could not create prescription. Check the backend console.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
