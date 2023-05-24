import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/app/interface/LoginCredentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  isLoggedIn!: boolean;

  credentials: LoginCredentials = {
    email: '',
    password: ''
  }

  private jwtHelper = new JwtHelperService();

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    })
    if(this.auth.isAuthenticated()) {
      this.redirectUser();
    }
    
  }

  onLogin(){
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', JSON.stringify(res.accessToken));
        this.auth.setLoggedInStatus(true);

        this.redirectUser();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  redirectUser() {

    const storedToken = localStorage.getItem('token');
    let token: any;

    if(storedToken) {
      token = JSON.parse(storedToken);
    } else {
      console.log('User is not authenticated');
      this.router.navigate(['/'])
      return;
    }

    const role = this.jwtHelper.decodeToken(token).authorities[0];

    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin/issues']);
        break;
      case 'ROLE_TEACHER':
        this.router.navigate(['teacher']);
        break;
      case 'ROLE_TECHNICIAN':
        this.router.navigate(['technician']);
        break;
      default:
        console.error("User has not acceptable authorities");
        this.router.navigate(['/unauthorized']);
    }
  }

}
