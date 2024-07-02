import { Injectable, signal, WritableSignal, effect, computed } from '@angular/core';
import { User } from '../../_models/User.type';
import { Idea } from '../../_models/Idea.type';
import { LoginResponse } from '../../_models/LoginResponse.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // crea un signal e lo inizializza 
  loggedUser: WritableSignal<User> = signal<User>({
    username: this.getUsername(), 
    ideas: this.getIdeas()
  })

  username = computed(() => this.loggedUser().username)
  ideas = computed(() => this.loggedUser().ideas)

  constructor(){
    effect(() => {
      const username = this.loggedUser().username; 
      const ideas = this.loggedUser().ideas; 

      if(username != null){
        localStorage.setItem("Username", username)
      } else {
        localStorage.removeItem("Username")
      }

      if(ideas != null){
        localStorage.setItem("Ideas", JSON.stringify(ideas)); 
      } else {
        localStorage.removeItem("Ideas")
      }

    })
  }

  getUsername(){
    return localStorage.getItem("Username")
  }
  
  getIdeas(){
    const ideas = localStorage.getItem("Ideas"); 
    if(ideas != null) return JSON.parse(ideas); 
    else return [] as Idea[]; 
  }


  updateUserOnLogin(httpResponse: LoginResponse): void {
    console.log(httpResponse)
    this.loggedUser.set({
      username: httpResponse.user.userName, 
      ideas: httpResponse.user.Ideas
    })
  }

  updateUserOnLogout(){
    this.loggedUser.set({
      username: null, 
      ideas: [] 
    })
  }

}

