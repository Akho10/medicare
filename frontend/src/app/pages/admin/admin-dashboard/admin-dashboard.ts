import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-admin-dashboard',
  styleUrl: './admin-dashboard.css',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {}
