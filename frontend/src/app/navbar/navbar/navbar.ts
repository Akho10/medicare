import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

    constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get role():string | null{
    return this.authService.getRole();
  }

  logout():void{
    const currentRole = this.authService.getRole();

    this.authService.logout();

    if(currentRole === 'ADMIN'){

      this.router.navigate(['/admin-login']);
    }else{
      this.router.navigate(['/user-login']);
    }
  }
}
