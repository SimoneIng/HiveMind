import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { UserService } from '../../_services/user/user.service';
import { IdeaComponent } from '../idea/idea.component';
import { RouterLink } from '@angular/router';
import { IdeaExtended } from '../../_models/IdeaExtended.type';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [IdeaComponent, RouterLink, IdeaComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  authService = inject(AuthService); 
  userService = inject(UserService); 

  userIdeas: IdeaExtended [] = []; 
  userUpvotes: number = 0; 
  userDownvotes: number = 0;  

  ngOnInit(){
    this.userIdeas = this.userService.getIdeas(); 
    console.log(this.userIdeas)

    this.userIdeas.forEach(idea => {
      this.userUpvotes += idea.upVotes; 
      this.userDownvotes += idea.downVotes; 
    }); 

  }

  onIdeaDeleted(ideaID: string){
    this.userIdeas = this.userIdeas.filter(idea => idea.ideaID != ideaID); 
    localStorage.setItem("User-Ideas", JSON.stringify(this.userIdeas))
  }

}
