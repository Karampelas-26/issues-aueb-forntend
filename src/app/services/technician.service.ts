import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../interface/Application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private url = "http://localhost:8080/technician/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {}

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.url}getAllApplications`, this.httpOptions);
  }

  getAllSitesNames() {
    return this.http.get(`${this.url}getSitesName`, this.httpOptions);
  }

  getBuildingsName() {
    return this.http.get(`${this.url}getBuildingsName`, this.httpOptions);
  }

  getBuildingsSitesName(){
    return this.http.get(`${this.url}getBuildinsSitesName`, this.httpOptions);
  }

  getApplicationsFiltered(site: string, building: string, status: string, priority: string): Observable<Application[]> {
    if(site !== '' && site !== null){
      console.log(site)
      this.httpOptions.params = this.httpOptions.params.set('site_name', site); 
    }
    if( priority !== '' && priority !== null){
      console.log(priority);
      
      this.httpOptions.params = this.httpOptions.params.set('priority', priority);
    }
    if( status !== '' && status !== null){
      console.log(status);
      
      this.httpOptions.params = this.httpOptions.params.set('status', status);
    }
    if( building !== '' && building !== null){
      console.log(building);
      
      this.httpOptions.params = this.httpOptions.params.set('buildingName', building);
    }
    console.log(this.httpOptions.params)
    return this.http.get<Application[]>(`${this.url}filtered-applications-s-values`, this.httpOptions);
  }
}
