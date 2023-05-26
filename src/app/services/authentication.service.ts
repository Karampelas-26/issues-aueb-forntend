import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginCredentials } from '../interface/LoginCredentials';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from '../interface/ForgotPasswordRequest';
import { ResetPasswordRequest } from '../interface/ResetPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = "http://localhost:8080/auth/";

  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>;
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  private jwt = new JwtHelperService();

  private loggedIn!: boolean;
  
  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = !!localStorage.getItem("loggedIn");
  }
  
  public setLoggedInStatus(status: boolean) {
    this.loggedIn = status;
    localStorage.setItem("loggedIn", String(status));
    this.isLoggedInSubject.next(status);
  }

  public getLoggedIn(){
    return this.loggedIn;
  }

  public login(credentials: LoginCredentials) {
    return this.http.post(`${this.url}login`, credentials, this.httpOptions)
  }

  isExpired(){
    const token = localStorage.getItem('token');
    if(token == null) return false;
    return this.jwt.isTokenExpired(token);
  }

  getAutority() {
    const token = localStorage.getItem('token');
    if(token == null) return;
    return this.jwt.decodeToken(token).authorities[0];
  }

  forgotPassword(email: ForgotPasswordRequest) {
    return this.http.post(`${this.url}forgotPassword`, email, this.httpOptions); 
  }

  resetPassword(reset: ResetPasswordRequest) {
    return this.http.post(`${this.url}resetPassword`, reset, this.httpOptions);
  }

  public redirectUser() {

    const storedToken = localStorage.getItem('token');
    let token: any;

    if(storedToken) {
      token = JSON.parse(storedToken);
    } 
    if (!this.loggedIn) {
      console.log('User is not authenticated');
      this.router.navigate(['/login'])
      return;
    }

    const role = this.jwt.decodeToken(token).authorities[0];

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
