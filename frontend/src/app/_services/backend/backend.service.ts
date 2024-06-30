import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from '../../_models/AuthRequest.type';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../_models/LoginResponse.type';


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

  login(loginRequest: AuthRequest){
    const url = `${this.backendUrl}/auth/login`;
    return this.http.post<LoginResponse>(url, loginRequest, this.httpOptions); 
  }

  signup(signupRequest: AuthRequest){
    const url = `${this.backendUrl}/auth/registration`;
    console.log(signupRequest)
    return this.http.post<string>(url, signupRequest, this.httpOptions); 
  }

}
