import { Component, inject, Input, Output, signal } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { Comment } from '../../_models/Comment.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input({required: true}) comment: Comment; 

  user = inject(UserService); 
  isCommentOfLoggedUser = signal<boolean>(false)
  
  onInit(){
    console.log(this.user.userID())
    console.log(this.comment.userID)
    if(this.user.userID() === this.comment.userID){
      this.isCommentOfLoggedUser.set(true)
    }
  }

  deleteComment(){
    console.log("Deleting Comment")
  }

}
