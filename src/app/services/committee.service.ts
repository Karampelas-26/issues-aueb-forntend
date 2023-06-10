import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import {from, Observable} from 'rxjs';
import { Application } from '../interface/Application';
import {CreateBuilding} from "../interface/Create-building";
import {Equipment} from "../interface/Equipment";
import {Comment} from "../interface/Comment";
import { CreateEquipment } from '../interface/create-equipment';

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
  getBuildings() {
    return this.http.get(`${this.commonUrl}getBuilding`, this.httpOptions);
  }

  getBuildingsSitesName(){
    return this.http.get(`${this.commonUrl}getBuildingsSitesName`, this.httpOptions);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.commonUrl}getAllApplications`, this.httpOptions);
  }

  getApplicationsFiltered(site: string, building: string, status: string, priority: string): Observable<Application[]> {
    let httpOptionsTemp = {...this.httpOptions}

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

  getEquipment(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.commonUrl}getEquipment`,this.httpOptions);
  }

  public getBuildingsWithSites(): Observable<Map<string, string[]>>{
    return this.http.get<Map<string, string[]>>(`${this.commonUrl}getBuildingsSitesName`, this.httpOptions);
  }

  public getEquipments(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.commonUrl}getEquipment`, this.httpOptions);
  }

  public getStaticEnums(){
    return this.http.get(`${this.commonUrl}staticEnums`, this.httpOptions);
  }


  public submitIssue(data: { issueType: any; siteName: any; title: any; equipment: any }) {
    return this.http.post(`${this.commonUrl}submit-new-issue`, data, this.httpOptions);
  }

  public comment(newComment: string, issue_id: string): Observable<Comment> {
    let httpOptionsTemp = {...this.httpOptions};
    httpOptionsTemp.params = httpOptionsTemp.params.set('issue_id', issue_id);
    return this.http.post<Comment>(`${this.commonUrl}add_comment`,newComment, httpOptionsTemp);
  }

  public getPersonalInfo(): Observable<User> {
    return this.http.get<User>(`${this.commonUrl}getPersonalInfo`, this.httpOptions);
  }

  public deleteEquipment(equipmentId:number) {
    return this.http.delete(`${this.commonUrl}deleteEquipment/${equipmentId}`,this.httpOptions);
  }

  public getStatistics(fromDate: string, toDate: string, selectedIssue: string, selectedBuilding: string) {
    let httpOptionsTemp = {...this.httpOptions}
    if(fromDate !== '' && fromDate != undefined ){
      httpOptionsTemp.params = httpOptionsTemp.params.set('createStart', fromDate);
    }
    if(toDate){
      httpOptionsTemp.params = httpOptionsTemp.params.set('createEnd', toDate);
    }
    if( selectedIssue){
      httpOptionsTemp.params = httpOptionsTemp.params.set('issueType', selectedIssue);
    }
    if( selectedBuilding){
      httpOptionsTemp.params = httpOptionsTemp.params.set('buildingId', selectedBuilding);
    }
    return this.http.get(`${this.url}statistics/getApplicationsByMonth`, httpOptionsTemp);
  }

  public createEquipment(data:CreateEquipment):Observable<CreateEquipment>{
    return this.http.post<CreateEquipment>(`${this.url}createEquipment`,data,this.httpOptions);
  }

  public downloadStats() {
    return this.http.get(`${this.url}downloadStatistics`, {responseType: 'blob'});
  }

}


