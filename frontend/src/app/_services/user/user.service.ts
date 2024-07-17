import { Injectable, signal, WritableSignal, effect, computed } from '@angular/core';
import { User } from '../../_models/User.type';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { LoginResponse } from '../../_models/LoginResponse.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // crea un signal e lo inizializza 
  loggedUser: WritableSignal<User> = signal<User>({
    userID: this.getUserID(), 
    username: this.getUsername(), 
    ideas: this.getIdeas(),
    profileImagePath: this.getProfileImagePath() 
  })

  userID = computed(() => this.loggedUser().userID)
  username = computed(() => this.loggedUser().username)
  profileImagePath = computed(() => this.loggedUser().profileImagePath)
  ideas = computed(() => this.loggedUser().ideas)

  constructor(){
    effect(() => {
      const username = this.loggedUser().username; 
      const ideas = this.loggedUser().ideas; 
      const userID = this.loggedUser().userID; 
      const profileImagePath = this.loggedUser().profileImagePath; 

      if(username != null){
        localStorage.setItem("Username", username)
      } else {
        localStorage.removeItem("Username")
      }

      if(userID != null){
        localStorage.setItem("UserID", userID)
      } else {
        localStorage.removeItem("UserID")
      }

      if(ideas != null){
        localStorage.setItem("User-Ideas", JSON.stringify(ideas)); 
      } else {
        localStorage.removeItem("User-Ideas")
      }

      if(profileImagePath != null){
        localStorage.setItem('ProfileImagePath', profileImagePath)
      } else {
        localStorage.removeItem("ProfileImagePath")
      }

    })
  }

  getProfileImagePath(){
    return localStorage.getItem("ProfileImagePath"); 
  }

  getUserID(){
    return localStorage.getItem("UserID")
  }

  getUsername(){
    return localStorage.getItem("Username")
  }

  getIdeas(){
    const ideas = localStorage.getItem("User-Ideas"); 
    if(ideas != null) return JSON.parse(ideas) as IdeaExtended[]; 
    else return []; 
  }

  updateUserOnLogin(httpResponse: LoginResponse): void {
    console.log(httpResponse)
    this.loggedUser.set({
      userID: httpResponse.user.userID, 
      username: httpResponse.user.userName, 
      profileImagePath: httpResponse.user.profileImagePath,  
      ideas: httpResponse.user.Ideas,
    })
  }

  updateUserOnLogout(){
    this.loggedUser.set({
      userID: null, 
      username: null, 
      profileImagePath: null, 
      ideas: null 
    })
  }

}

