import { Component } from '@angular/core';
import { User, UserService } from '../../../services/user';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule,CommonModule,RouterLink],
  selector: 'app-user-register',
  styleUrl: './user-register.css',
  templateUrl: './user-register.html',
})
export class UserRegister {
  
confrimPassword="";

user:User = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    phone:''

};

confirmPassword='';
message='';
errorMessage= '';
loading=false;

constructor(
  private userService: UserService,
  private router:Router
){}

register():void{

  this.message='';
  this.errorMessage='';

  if(this.user.password !== this.confirmPassword){
 this.errorMessage='No match';
 return;
  }

  this.loading=true;

  this.userService.registerUser(this.user).subscribe({
    next: () => {
      this.loading=false;
      this.message='You have successfully registered.';
    },
    
    error: (error) => {

      this.loading=false;

      if(error.status === 409){

        this.errorMessage='An account with this email already exists';

      }else{
         this.errorMessage= error.error?.message || 'Registration failed.';
      }
    }

  })
}
}
