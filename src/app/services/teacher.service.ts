import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Equipment} from "../interface/Equipment";
import {ApplicationTeacher} from "../interface/ApplicationTeacher";
import {Notification} from "../interface/Notification";

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
    }),
    params: new HttpParams()
  };

  public getApplications(): Observable<ApplicationTeacher[]> {
    return this.http.get<ApplicationTeacher[]>(`${this.url}getApplications`, this.httpOptions);
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


  public submitIssue(data: { issueType: any; siteName: string | null; equipment: any; description: any }) {
    return this.http.post(`${this.common}submit-new-issue`, data, this.httpOptions);
  }

  public getPreferences():Observable<string[]> {
    return this.http.get<string[]>(`${this.url}getPreferences`, this.httpOptions);
  }

  public setPreferences(preferences: string[] | null) {
    let temptHttpOptions = {...this.httpOptions}
    if(preferences){
      temptHttpOptions.params = temptHttpOptions.params.set('sites', preferences.join(','))
    }
    return this.http.get(`${this.url}setPreferences`, temptHttpOptions);
  }

  public getSitesNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.common}getSitesName`, this.httpOptions);
  }

  public getSiteEquipments(value: string): Observable<Equipment[]> {
    let tempHttpOptions = {...this.httpOptions}
    if(value){
      tempHttpOptions.params = tempHttpOptions.params.set("siteName", value);
    }
    return this.http.get<Equipment[]>(`${this.common}getEquipmentsOfSiteName`, tempHttpOptions);
  }

  public getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.url}notifications`,this.httpOptions);
  }
}
