import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import { Observable } from 'rxjs';

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

  uploadUsersCSV(users: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.url}upload-users`, users, {headers: headers});
  }

  getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(`${this.url}get-users`, this.httpOptions);
  }
  
  updateUser(user: User) {
    return this.http.put(`${this.url}update-user`, user, this.httpOptions);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.url}delete-user/${userId}`, this.httpOptions);
  }
}
