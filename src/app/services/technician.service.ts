import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../interface/Application';
import { Observable } from 'rxjs';
import {User} from "../interface/User";
import {Comment} from "../interface/Comment";

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private url = "http://localhost:8080/technician/";
  private commonUrl = "http://localhost:8080/common/"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {}

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.commonUrl}getAllApplications`, this.httpOptions);
  }

  getAllSitesNames() {
    return this.http.get(`${this.commonUrl}getSitesName`, this.httpOptions);
  }

  getBuildingsName() {
    return this.http.get(`${this.commonUrl}getBuildingsName`, this.httpOptions);
  }

  getBuildingsSitesName(){
    return this.http.get(`${this.commonUrl}getBuildingsSitesName`, this.httpOptions);
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
    return this.http.get<Application[]>(`${this.commonUrl}filtered-applications-s-values`, httpOptionsTemp);
  }

  completeApplication(id: string) {
    let httpOptionsTemp = {...this.httpOptions};
    httpOptionsTemp.params = httpOptionsTemp.params.set('id', id);
    return this.http.get(`${this.commonUrl}completeApplication`, httpOptionsTemp);
  }

  getTechnicians(issueType: string): Observable<User[]> {
    let httpOptionsTemp = {...this.httpOptions};
    httpOptionsTemp.params = httpOptionsTemp.params.set('issue_type', issueType);
    return this.http.get<User[]>(`${this.commonUrl}getUsersByTechTeam`, httpOptionsTemp);
  }

  getUsersInComments(usersIdOfComments: string[]): Observable<User[]> {
    let httpOptionsTemp = {...this.httpOptions};
    httpOptionsTemp.params = httpOptionsTemp.params.set('usersIds', usersIdOfComments.join(','));
    return this.http.get<User[]>(`${this.commonUrl}getUsersByIds`,httpOptionsTemp);
  }

  updateApplication(data: Application): Observable<Application> {
    return this.http.put<Application>(`${this.commonUrl}update`, data, this.httpOptions);
  }

  public comment(newComment: string, issue_id: string): Observable<Comment> {
    let httpOptionsTemp = {...this.httpOptions};
    httpOptionsTemp.params = httpOptionsTemp.params.set('issue_id', issue_id);
    return this.http.post<Comment>(`${this.commonUrl}add_comment`,newComment, httpOptionsTemp);
  }

  public getPersonalInfo(): Observable<User> {
    return this.http.get<User>(`${this.commonUrl}getPersonalInfo`, this.httpOptions);
  }
}
