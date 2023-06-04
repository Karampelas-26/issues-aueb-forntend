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
    let httpOptionsTemp = {...this.httpOptions}
    console.log(httpOptionsTemp.params)

    if(site !== '' && site !== null){
      httpOptionsTemp.params = httpOptionsTemp.params.set('site_name', site); 
    }
    if( priority !== '' && priority !== null){
      httpOptionsTemp.params = httpOptionsTemp.params.set('priority', priority);
    }
    if( status !== '' && status !== null){
      httpOptionsTemp.params = httpOptionsTemp.params.set('status', status);
    }
    if( building !== '' && building !== null){
      httpOptionsTemp.params = httpOptionsTemp.params.set('buildingName', building);
    }
    console.log(httpOptionsTemp.params)
    return this.http.get<Application[]>(`${this.url}filtered-applications-s-values`, httpOptionsTemp);
  }
}
