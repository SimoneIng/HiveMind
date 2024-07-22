import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IdeaComponent } from '../idea/idea.component';
import { RouterLink } from '@angular/router';

import { User } from '../../_models/User.type';


@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, IdeaComponent, RouterLink, IdeaComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  router = inject(Router);

  user: User;   
  upvotes: number = 0; 
  downvotes: number = 0; 

  constructor(){
    this.user = this.router.getCurrentNavigation()?.extras.state as User; 
    console.log(this.user)

    // calcolo Upvotes e DownVotes totali 
    this.user.ideas.forEach(idea => {
      this.upvotes += idea.upVotes;
      this.downvotes += idea.downVotes;
    })
  }

  onIdeaDeleted(ideaID: string){ // aggiorna il model della schermata corrente 
    this.user.ideas = this.user.ideas.filter(idea => idea.ideaID !== ideaID);
  }

}
