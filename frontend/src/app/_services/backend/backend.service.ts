import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authRequest } from '../../_models/authRequest.type';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  backendUrl: string = 'http://localhost:3000'; 
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })
  }; 

  login(loginRequest: authRequest){
    const url = `${this.backendUrl}/auth/login`;
    return this.http.post<string>(url, loginRequest, this.httpOptions); 
  }

}
