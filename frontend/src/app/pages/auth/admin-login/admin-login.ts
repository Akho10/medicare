import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-admin-login',
  styleUrl: './admin-login.css',
  templateUrl: './admin-login.html',
})
export class AdminLogin {

  email = '';
  password = '';

  errorMessage = '';
   loading = false;

   constructor(
    private authService: AuthService,
    private router: Router
  ) { }

onLogin(): void {
    this.errorMessage = '';
    

    if (!this.email.trim() || !this.password) {

      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;

    this.authService.adminLogin(this.email.trim(), this.password).subscribe({
      next: (admin: any) => {
        this.authService.saveLogin(admin, 'ADMIN');
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Invalid admin email or password';
        this.loading = false;

      }
    });
  }
  
    
  
}
