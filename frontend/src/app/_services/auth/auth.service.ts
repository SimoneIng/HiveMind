import { Injectable, WritableSignal, effect, signal, computed } from '@angular/core';
import { jwtDecode } from "jwt-decode"; 
import { User } from '../../_models/User.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserLoggedIn: WritableSignal<User> = signal<User>({
    userDetails: this.getUserDetails(), 
    token: this.getUserToken(), 
    isAuthenticated: this.verifyToken(this.getUserToken()) 
  })

  user = computed(() => { this.UserLoggedIn().userDetails })
  token = computed(() => { this.UserLoggedIn().token })
  isAuthenticated = computed(() => { this.UserLoggedIn().isAuthenticated }) 

  constructor(){
    effect( () => {
      const user = this.UserLoggedIn().userDetails;
      const token = this.UserLoggedIn().token; 

      if(user != null){
        localStorage.setItem('User', user.toString())
      } else {
        localStorage.removeItem('User'); 
      }

      if(token != null){
        localStorage.setItem("Token", token)
      } else {
        localStorage.removeItem("Token")
      }

    })
  }

  getUserDetails(){
    const user = localStorage.getItem('User')
    if (user) return JSON.parse(user)
    return null 
  }

  getUserToken(){
    return localStorage.getItem("Token")
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

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getUserToken());
  }

  userLogout(){
    this.UserLoggedIn.set({
      userDetails: null, 
      token: null, 
      isAuthenticated: false 
    })
  }

}
