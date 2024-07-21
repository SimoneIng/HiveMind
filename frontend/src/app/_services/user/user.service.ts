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
    ideas: [],
    profileImagePath: this.getProfileImagePath(),
    profileCreatedAt: this.getProfileCreatedAt() 
  })

  userID = computed(() => this.loggedUser().userID)
  username = computed(() => this.loggedUser().username)
  profileImagePath = computed(() => this.loggedUser().profileImagePath)
  profileCreatedAt = computed(() => this.loggedUser().profileCreatedAt)

  constructor(){
    effect(() => {
      const username = this.loggedUser().username; 
      const userID = this.loggedUser().userID; 
      const profileImagePath = this.loggedUser().profileImagePath; 
      const profileCreatedAt = this.loggedUser().profileCreatedAt; 

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

      if(profileImagePath != null){
        localStorage.setItem('ProfileImagePath', profileImagePath)
      } else {
        localStorage.removeItem("ProfileImagePath")
      }

      if(profileCreatedAt != null){
        const dateString = profileCreatedAt.toISOString(); 
        localStorage.setItem("ProfileCreatedAt", dateString);
      } else {
        localStorage.removeItem("ProfileCreatedAt")
      }

    })
  }

  getProfileCreatedAt(){
    const dateString = localStorage.getItem("ProfileCreatedAt");
    if(dateString) return new Date(dateString); 
    return null 
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

  updateUserOnLogin(httpResponse: LoginResponse): void {
    console.log(httpResponse)
    this.loggedUser.set({
      userID: httpResponse.user.userID, 
      username: httpResponse.user.userName, 
      profileImagePath: httpResponse.user.profileImagePath,  
      profileCreatedAt: httpResponse.user.profileCreatedAt,  
      ideas: httpResponse.user.Ideas 
    })
  }

  updateUserOnLogout(){
    this.loggedUser.set({
      userID: null, 
      username: null, 
      profileImagePath: null, 
      profileCreatedAt: null, 
      ideas: []
    })
  }

}

