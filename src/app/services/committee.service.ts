import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import { Observable } from 'rxjs';
import { Application } from '../interface/Application';
import {CreateBuilding} from "../interface/Create-building";

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {

  private url = "http://localhost:8080/committee/";

  private commonUrl = "http://localhost:8080/common/"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {}


  //endpoints for users

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

  //endpoints about issues

  getAllSitesNames() {
    return this.http.get(`${this.commonUrl}getSitesName`, this.httpOptions);
  }

  getBuildingsName() {
    return this.http.get(`${this.commonUrl}getBuildingsName`, this.httpOptions);
  }

  getBuildingsSitesName(){
    return this.http.get(`${this.commonUrl}getBuildingsSitesName`, this.httpOptions);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.commonUrl}getAllApplications`, this.httpOptions);
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
