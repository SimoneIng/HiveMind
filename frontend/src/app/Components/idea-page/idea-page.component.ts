import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Comment } from '../../_models/Comment.type';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [CommonModule, MarkdownModule, CommentComponent],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {

  idea: IdeaExtended; 
  router = inject(Router);

  constructor () {
    this.idea = this.router.getCurrentNavigation()?.extras.state as IdeaExtended; 
    console.log(this.idea)
  }


}
