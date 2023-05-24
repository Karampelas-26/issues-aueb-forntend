import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../interface/LoginCredentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
import { RouterOutlet } from '@angular/router';

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
  
  constructor(private http: HttpClient) { }
  
  public setLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  public isAuthenticated () {
    const token = localStorage.getItem('token');
    if(!token) return false; 
    return !this.isExpired();
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

}
