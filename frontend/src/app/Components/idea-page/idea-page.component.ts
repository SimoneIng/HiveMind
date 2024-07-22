import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { User } from '../../_models/User.type';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CommentComponent } from '../comment/comment.component';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [CommonModule, MarkdownModule, CommentsSectionComponent, CommentComponent, FeedbackComponent],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {

  idea: IdeaExtended; 
  ideasService = inject(IdeasService); 
  router = inject(Router);

  constructor () {
    this.idea = this.router.getCurrentNavigation()?.extras.state as IdeaExtended; 
    console.log(this.idea)
  }

  goToUserPage(){
    console.log(this.ideasService.ideas());
    const user: User = {
      userID: this.idea.userID,
      username: this.idea.User.userName, 
      profileCreatedAt: this.idea.User.profileCreatedAt, 
      profileImagePath: this.idea.User.profileImagePath,   
      ideas: this.ideasService.ideas().filter(idea => idea.userID === this.idea.userID)
    }
    this.router.navigate(['/UserPage'], {state: user})
  }


}
