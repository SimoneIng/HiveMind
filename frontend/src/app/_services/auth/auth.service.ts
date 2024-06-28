import { Injectable, WritableSignal, effect, signal, computed } from '@angular/core';
import { jwtDecode } from "jwt-decode"; 
import { User } from '../../_models/User.type';
import { LoginResponse } from '../../_models/LoginResponse.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Crea un signal e li inizializza 
  authState: WritableSignal<User> = signal<User>({
    userDetails: JSON.parse(this.getUserDetails()), 
    token: this.getToken(), 
    isAuthenticated: this.verifyToken(this.getToken())
  })

  // Crea tre segnali che si aggiornano in base al segnale qui sopra 
  user = computed(() => this.authState().userDetails)
  token = computed(() => this.authState().token)
  isAuthenticated = computed(() => this.authState().isAuthenticated)

  constructor(){
    // funzione che viene eseguita ogni volta che il signal cambia 
    effect( () => {
      const token = this.authState().token; 
      const userDetails = this.authState().userDetails; 

      // aggiorna token e informazioni utente all'interno del localStorage 
      if(token != null){
        localStorage.setItem('Token', token)
      } else {
        localStorage.removeItem('Token')
      } 
      if(userDetails != null){
        localStorage.setItem('User', JSON.stringify(userDetails))
      } else {
        localStorage.removeItem('User')
      }
    })
  }

  getToken(){
    return localStorage.getItem('Token')
  }

  getUserDetails(){
    return JSON.stringify(localStorage.getItem('User')); 
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken())
  }

  verifyToken(token: string | null): boolean {
    if(token !== null){
      try{
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if(expiration === undefined || Date.now() >= expiration * 1000){
          return false; //expiration not available or in the past
        } else {
          return true; //token not expired
        }
      } catch(error) {  //invalid token
        return false;
      }
    }
    return false;
  }

  updateAuthStateOnLogin(httpResponse: LoginResponse): void {
    this.authState.set({
      userDetails: httpResponse.user, 
      token: httpResponse.token, 
      isAuthenticated: this.verifyToken(httpResponse.token)
    })
  }

}
