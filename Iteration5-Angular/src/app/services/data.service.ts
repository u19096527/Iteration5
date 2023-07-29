import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';

import { HelpTip } from '../shared/help-tip';
import { Student } from '../shared/student';
import { Voucher } from '../shared/voucher';
import { UserRole } from '../shared/user-role';



@Injectable({
  providedIn: 'root'
})

export class DataService {
  apiUrl = 'https://localhost:7135/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

// HELP TIPS
  GetAllTheHelpTips(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Help/GetAllHelpTips`).pipe( map( result => result) )
  }

  AddNewHelpTip(newHelpTip: HelpTip) {
    return this.httpClient.post(this.apiUrl + `Help/AddHelpTip`, newHelpTip);
  }

  AddABlob(model: HelpTip): Observable<any> {
    // const formData = new FormData();
    // formData.append('videoFile', model.videoFile, model.videoFile.name); // Set the file name and content type
    // formData.append('name', model.name);
    // formData.append('description', model.description);
    // formData.append('date', model.date);

    return this.httpClient.post(this.apiUrl + 'BlobExplorer/Post', model , { responseType: 'text' });
  }

  UpdateAHelpTip(Help_ID: number, updatedHelpTip: HelpTip){
    return this.httpClient.put(this.apiUrl + `Help/EditHelpTip/${Help_ID}`, updatedHelpTip);
  }

  DeleteHelpTip( Help_ID: number){
    return this.httpClient.delete(this.apiUrl + `Help/DeleteHelpTip/${Help_ID}`);
  }

  GetSelectedHelpTip(Help_ID: number){
    return this.httpClient.get(this.apiUrl + `Help/GetAHelpTip/${Help_ID}`);
  }

  SearchHelpTips(enteredQuery: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}Help/GetSearchedHelpTip/${enteredQuery}`).pipe( map( result => result));
  }

  // USER ROLES
  GetAllTheUserRoles(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Help/GetAllUserRoles`).pipe( map( result => result) )
  }

  AddNewUserRole(newUserRole: UserRole) {
    return this.httpClient.post(this.apiUrl + `Help/AddUserRole`, newUserRole);
  }

  UpdateAUserRole(userrole_ID: number, updatedUserRole: UserRole){
    return this.httpClient.put(this.apiUrl + `Help/EditUserRole/${userrole_ID}`, updatedUserRole);
  }

  DeleteUserRole( userrole_ID: number){
    return this.httpClient.delete(this.apiUrl + `Help/DeleteUserRole/${userrole_ID}`);
  }

  GetSelectedUserRole(userrole_ID: number){
    return this.httpClient.get(this.apiUrl + `Help/GetAUserRole/${userrole_ID}`);
  }

  SearchUserRoles(enteredQuery: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}Help/GetSearchedUserRole/${enteredQuery}`).pipe( map( result => result));
  }
}