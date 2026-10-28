import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-user-dashboard',
  styleUrl: './user-dashboard.css',
  templateUrl: './user-dashboard.html',
})
export class UserDashboard implements OnInit{
  userName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const account = this.authService.getAccount();

    if (account) {
      this.userName = account.firstName;
    }
  }
}
