import { Injectable, WritableSignal, effect, signal, computed } from '@angular/core';
import { jwtDecode } from "jwt-decode"; 
import { LoginResponse } from '../../_models/LoginResponse.type';
import { AuthState } from '../../_models/AuthState.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Crea un signal e li inizializza 
  authState: WritableSignal<AuthState> = signal<AuthState>({
    token: this.getToken(), 
    isAuthenticated: this.verifyToken(this.getToken())
  })

  token = computed(() => this.authState().token)
  isAuthenticated = computed(() => this.authState().isAuthenticated)

  constructor(){
    // funzione che viene eseguita ogni volta che il signal cambia 
    effect( () => {
      const token = this.authState().token; 

      // aggiorna token e informazioni utente all'interno del localStorage 
      if(token != null){
        localStorage.setItem('Token', token)
      } else {
        localStorage.removeItem('Token')
      } 

    })
  }

  getToken(){
    return localStorage.getItem('Token')
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
      token: httpResponse.token, 
      isAuthenticated: this.verifyToken(httpResponse.token)
    })
  }

}
