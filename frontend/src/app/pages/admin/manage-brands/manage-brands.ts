import { Component, OnInit } from '@angular/core';
import { Brand, BrandService } from '../../../services/brand';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-manage-brands',
  styleUrl: './manage-brands.css',
  templateUrl: './manage-brands.html',
    standalone: true
})
export class ManageBrands implements OnInit{
  brands: Brand[] = [];

  brand: Brand = {
    name: '',
    description: ''
  };

  searchName = '';
  message = '';
  errorMessage = '';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    //  console.log('Manage Brands opened');
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        //  console.log('Brands loaded from database:', data);
        this.brands = data;
      },
      error: () => {
        this.errorMessage = 'Could not load brands.';
      }
    });
  }

  addBrand(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.brand.name.trim()) {
      this.errorMessage = 'Please enter a brand name.';
      return;
    }

    const newBrand: Brand = {
      name: this.brand.name.trim(),
      description: this.brand.description.trim()
    };

    this.brandService.addBrand(newBrand).subscribe({
      next: () => {
        this.message = 'Brand added successfully!';
        this.brand = { name: '', description: '' };
        this.loadBrands();
      },
      error: () => {
        this.errorMessage = 'Could not add brand.';
      }
    });
  }

  searchBrand(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.searchName.trim()) {
      this.loadBrands();
      return;
    }

    this.brandService.searchBrand(this.searchName.trim()).subscribe({
      next: (data) => {
        this.brands = data ? [data] : [];
      },
      error: () => {
        this.brands = [];
        this.errorMessage = 'No matching brand found.';
      }
    });
  }

  deleteBrand(id: number): void {
    if (!confirm('Are you sure you want to delete this brand?')) {
      return;
    }

    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.message = 'Brand deleted successfully!';
        this.errorMessage = '';
        this.loadBrands();
      },
      error: () => {
        this.errorMessage =
          'Could not delete brand. It may still have medicines linked to it.';
      }
    });
  }
}
