import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from '../../_models/AuthRequest.type';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../_models/LoginResponse.type';
import { Idea } from '../../_models/Idea.type';
import { GenericGetResponse } from '../../_models/GenericGetResponse.type';
import { GenericResponse } from '../../_models/GenericResponse.type';

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
    return this.http.post<string>(url, signupRequest, this.httpOptions); 
  }

  getIdeas(){
    const url = `${this.backendUrl}/ideas`;
    return this.http.get<GenericGetResponse>(url, this.httpOptions); 
  }

  postIdea(idea: object){
    const url = `${this.backendUrl}/ideas`;
    return this.http.post<GenericResponse>(url, this.httpOptions); 
  }

  deleteIdea(ideaId: string){
    const url = `${this.backendUrl}/ideas/${ideaId}`;
    return this.http.delete<GenericResponse>(url, this.httpOptions); 
  }

  getComments(ideaId: string){
    const url = `${this.backendUrl}/ideas/${ideaId}/comments`;
    return this.http.get<GenericGetResponse>(url, this.httpOptions)
  }

  postComments(ideaId: string, commentDescription: string){
    const url = `${this.backendUrl}/ideas/${ideaId}/comments`;
    return this.http.post<GenericResponse>(url, { description: commentDescription }, this.httpOptions)
  }

  deleteComment(ideaId: string, commentId: string){
    const url = `${this.backendUrl}/ideas/${ideaId}/comments/${commentId}`;
    return this.http.delete<GenericResponse>(url, this.httpOptions)
  }

  getFeedback(ideaId: string){
    const url = `${this.backendUrl}/ideas/${ideaId}/feedbacks`;
    return this.http.get<GenericGetResponse>(url, this.httpOptions)
  }

  postFeedback(ideaId: string, flag: boolean){
    const url = `${this.backendUrl}/ideas/${ideaId}/feedbacks`;
    return this.http.post<GenericResponse>(url, {ideaId, flag}, this.httpOptions)
  }

  deleteFeedback(ideaId: string, feedbackId: string){
    const url = `${this.backendUrl}/ideas/${ideaId}/comments/${feedbackId}`;
    return this.http.delete<GenericResponse>(url, this.httpOptions)
  }

}
