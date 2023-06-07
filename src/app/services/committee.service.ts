import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CreateBuilding} from "../interface/Create-building";

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

  getBuilding(){
    return this.http.get(`${this.url}getBuilding`,this.httpOptions);
  }

  createBuilding(buildingForm:any){
    return this.http.post(`${this.url}createBuilding`,buildingForm,this.httpOptions);
  }

  createSite(siteForm: CreateBuilding){
    return this.http.post(`${this.url}createSites`,siteForm,this.httpOptions);
  }

  getEquipment(){
    return this.http.get(`${this.url}getEquipment`,this.httpOptions);
  }
}
