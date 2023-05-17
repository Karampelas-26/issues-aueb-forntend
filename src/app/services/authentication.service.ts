import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../LoginCredentials';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = "http://localhost:8080/auth/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  private jwt = new JwtHelperService();
  
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials) {
    return this.http.post(`${this.url}login`, credentials, this.httpOptions)
  }


  token(){

    // const expirationDate = this.jwtHelper.getTokenExpirationDate(res.accessToken);
    // const isExpired = this.jwtHelper.isTokenExpired(res.accessToken);    
    // console.log("token expires: " + expirationDate + " and is valid: " + isExpired)
  }

}
