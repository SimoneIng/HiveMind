import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { Comment } from '../../_models/Comment.type';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input({required: true}) comment: Comment; 
  @Output() deleteCommentEvent = new EventEmitter<string>();  

  user = inject(UserService); 


  deleteComment(){
    if(this.user.userID() != this.comment.userID){
      Swal.fire({
        icon: "error",
        text: "Non puoi cancellare un commento non tuo..",
        timer: 1500 
      })
    } else {
      this.deleteCommentEvent.emit(this.comment.commentID); 
    }
  }

  isCommentOfLoggedUser(){
    if(this.user.userID() != this.comment.userID) return true 
    return false
  }

}
