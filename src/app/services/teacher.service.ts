import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Equipment} from "../interface/Equipment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/teacher/";
  private common = "http://localhost:8080/common/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public getApplications() {
    return this.http.get(`${this.url}getApplications`, this.httpOptions);
  }

  public getBuildingsWithSites(): Observable<Map<string, string[]>>{
    return this.http.get<Map<string, string[]>>(`${this.common}getBuildingsSitesName`, this.httpOptions);
  }

  public getEquipments(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.common}getEquipment`, this.httpOptions);
  }

  public getStaticEnums(){
    return this.http.get(`${this.common}staticEnums`, this.httpOptions);
  }


  public submitIssue(data: { issueType: any; siteName: any; title: any; equipment: any }) {
    return this.http.post(`${this.common}submit-new-issue`, data, this.httpOptions);
  }
}
