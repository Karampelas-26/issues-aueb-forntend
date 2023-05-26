import { Component, OnInit } from '@angular/core';
import { ForgotPasswordRequest } from 'src/app/interface/ForgotPasswordRequest';
import { ResetPasswordRequest } from 'src/app/interface/ResetPasswordRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  hasSendOTP = false;

  forgotPassword: ForgotPasswordRequest = {
    email: 'george.karampelas.26@gmail.com'
  }

  resetPassword: ResetPasswordRequest = {
    email: '',
    otp: '',
    password: ''
  }

  checkPassword = '';

  isLoggedIn!: boolean;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    
    this.isLoggedIn = this.auth.getLoggedIn();

    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    })
    if(this.isLoggedIn) {
      this.auth.redirectUser();
    }
  }

  onForgotPassword() {
    this.auth.forgotPassword(this.forgotPassword).subscribe({
      next: (response) => {
        console.log(response);
        this.hasSendOTP = !this.hasSendOTP;
        console.log(this.resetPassword.email)
      },
      error: (err) => {
        //bgaze na emfanizei error message
        console.error(err);
      }
    })
  }

  onResetPassword() {
    if(this.checkPassword === this.resetPassword.password) {
      //todo bale na bgazei mhnuma error
      console.error("Οι κωδικοί πρόσβασης δεν ταιριάζουν.")
    }
    this.resetPassword.email = this.forgotPassword.email;
    this.auth.resetPassword(this.resetPassword).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        
      }
    })
  }


  //sta error messages ena p me chrome kai message me ngmodel gia bind me oti thes error apo ts

}
