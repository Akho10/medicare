import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../../services/user';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-user-profile',
  styleUrl: './user-profile.css',
  templateUrl: './user-profile.html',
})
export class UserProfile implements OnInit{
user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  };

  message = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const account = this.authService.getAccount();

    if (!account || this.authService.getRole() !== 'USER') {
      this.router.navigate(['/user-login']);
      return;
    }

    this.user = {
      id: account.id,
      firstName: account.firstName || '',
      lastName: account.lastName || '',
      email: account.email || '',
      password: '',
      phone: account.phone || ''
    };
  }

  updateProfile(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.user.id) {
      this.errorMessage = 'User ID was not found. Please log in again.';
      return;
    }

    // The update endpoint will be connected here.
    this.errorMessage = 'Profile update is not connected yet.';
  }
}
