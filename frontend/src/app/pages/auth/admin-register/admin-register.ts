import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-admin-register',
  styleUrl: './admin-register.css',
  templateUrl: './admin-register.html',
})
export class AdminRegister {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.firstName.trim() || !this.lastName.trim() ||
      !this.email.trim() || !this.password) {

        this.errorMessage='Please complete all fields';
        return;
    }

    this.loading=true;

    const admin ={
      firstName: this.firstName.trim(),
      lastName:this.lastName.trim(),
      email: this.email.trim(),
      password: this.password
    };

    this.authService.registerAdmin(admin).subscribe({
      next: () => {
        this.successMessage ='Admin registered successfully';

        this.loading = false;

        this.router.navigate(['/admin-login']);
      },
      error: (error: any) => {
        this.errorMessage= error.error?.message || 'Admin registration failed';

        this.loading=false;
      }
    });
  }


}
