import { Component } from '@angular/core';
import { LoginCredentials } from 'src/app/LoginCredentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  credentials: LoginCredentials = {
    email: 'george',
    password: 'gk'
  }

  private jwtHelper = new JwtHelperService();

  constructor(private auth: AuthenticationService) {}

  onLogin(){
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log(res.accessToken);
        localStorage.setItem('token', JSON.stringify(res.accessToken));
        const expirationDate = this.jwtHelper.getTokenExpirationDate(res.accessToken);
        const isExpired = this.jwtHelper.isTokenExpired(res.accessToken);    
        const ss = this.jwtHelper.decodeToken(res.accessToken);
        console.log(ss.role)
        // console.log("token expires: " + expirationDate + " and is valid: " + isExpired)
        
      },
      error: (err) => {
        console.error(err);
        
      }
    });
  }

}
