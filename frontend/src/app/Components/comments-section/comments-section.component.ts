import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { Comment } from '../../_models/Comment.type';
import { UserService } from '../../_services/user/user.service';
import { CommentComponent } from "../comment/comment.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { IdeasService } from '../../_services/ideas/ideas.service';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommentComponent, ReactiveFormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent {

  @Input({required: true}) comments: Comment [] = []; 
  @Input({required: true}) ideaID: string; 
  @Output() close = new EventEmitter<void>();
  @Output() commentCreated = new EventEmitter<Comment>(); 

  user = inject(UserService); 
  backend = inject(BackendService); 
  ideaService = inject(IdeasService); 

  commentForm = new FormGroup({
    commentText: new FormControl('',
      [Validators.minLength(1), Validators.maxLength(20)]), 
  }) 


  closeCommentsSection(){
    this.close.emit(); 
  } 

  postNewCommentAction(){
    if(this.commentForm.valid){
      const commentText = this.commentForm.value.commentText; 
      console.log(commentText); 
      if(commentText != undefined){
        this.postNewComment(commentText); 
      } else {
        Swal.fire({
          icon: "error", 
          text: "Errore nel caricamento del commento, riprovare più tardi...", 
          timer: 1500
        })
      }
    }
  }

  postNewComment(commentText: string){
    this.backend.postComments(this.ideaID, commentText).subscribe({
      next: response => {
        console.log(response); 
        const newComment: Comment = response.data as Comment; 
        this.commentCreated.emit(newComment); 
      }, 
      error: err => {
        Swal.fire({
          icon: "error",
          title: err?.error?.message,
          showConfirmButton: false, 
          timer: 1500
        })
      }, 
      complete: () => {
        Swal.fire({
          icon: "success",
          title: "Commento Caricato...",
          showConfirmButton: false, 
          timer: 1500 
        })
      }
    })
  }

}
