import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/app/interface/LoginCredentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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

  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
    this.isLoggedIn = this.auth.getLoggedIn();
    console.log("this is in ngoninit: " + this.isLoggedIn)

    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    })
    if(this.isLoggedIn) {
      this.auth.redirectUser();
    }
    
  }

  onLogin(){
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', JSON.stringify(res.accessToken));
        this.auth.setLoggedInStatus(true);

        this.auth.redirectUser();
      },
      error: (err) => {
        this.snackBar.open('Error: ' + err.error.message, "Close", {
          duration: 3000
        });
        console.error(err);
      }
    });
  }
}
