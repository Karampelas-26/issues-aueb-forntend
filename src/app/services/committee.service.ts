import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {

  private url = "http://localhost:8080/committee/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) {}

  createUser(userForm: any) {
    console.log(userForm);
    return this.http.post(`${this.url}create-user`, userForm, this.httpOptions);
  }
}
