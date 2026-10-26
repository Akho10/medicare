import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-user-login',
  styleUrl: './user-login.css',
  templateUrl: './user-login.html',
})
export class UserLogin {

  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password) {

      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;

    this.userService.loginUser(this.email.trim(), this.password).subscribe({
      next: (user: any) => {
        this.authService.saveLogin(user, 'USER');
        this.successMessage = 'Login successful';
        this.router.navigate(['user-dashboard']);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Invalid email or password';
        this.loading = false;

      }
    });
  }
}
