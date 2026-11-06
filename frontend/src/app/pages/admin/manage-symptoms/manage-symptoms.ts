import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Symptom, SymptomService } from '../../../services/symptom';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-manage-symptoms',
  styleUrl: './manage-symptoms.css',
  templateUrl: './manage-symptoms.html',
})
export class ManageSymptoms implements OnInit {

  symptoms: Symptom[] = [];

  symptom: Symptom = {
    name: ''
  };

  message = '';
  errorMessage = '';

  constructor(
    private symptomService: SymptomService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSymptoms();
  }

  loadSymptoms(): void {this.symptomService.getSymptoms().subscribe({
    next: (data) => {
      console.log('Symptoms received:', data);
      this.symptoms = data;
      this.errorMessage = '';
      this.changeDetectorRef.markForCheck();
    },
    error: (error) => {
      console.error('Error loading symptoms:', error);
      this.errorMessage = 'Could not load symptoms.';
      this.changeDetectorRef.markForCheck();
    }
  });
  }

  addSymptom(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.symptom.name.trim()) {
      this.errorMessage = 'Please enter a symptom name.';
      return;
    }
    const newSymptom: Symptom = {
      name: this.symptom.name.trim()
    };

    this.symptomService.addSymptom(newSymptom).subscribe({
      next: () => {
        this.message = 'Symptom added successfully!';
        this.symptom = { name: '' };
        this.changeDetectorRef.markForCheck();
        this.loadSymptoms();
      },
      error: () => {
        this.errorMessage = 'Could not add symptom.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
