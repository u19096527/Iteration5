import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';

import { Helptip } from '../shared/helptip';
import { Student } from '../shared/student';
import { UserRole } from '../shared/user-role';
import { Voucher } from '../shared/voucher';


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

  GetAllTheHelpTips(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Help/GetAllHelpTips`).pipe( map( result => result) )
  }
  AddNewHelpTip(newHelpTip: Helptip) {
    return this.httpClient.post(this.apiUrl + `Help/AddHelpTip`, newHelpTip);
  }
  UpdateAHelpTip(Help_ID: number, updatedHelpTip: Helptip){
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

}
