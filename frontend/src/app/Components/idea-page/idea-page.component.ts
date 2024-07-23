import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { User } from '../../_models/User.type';
import { Comment } from '../../_models/Comment.type';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CommentComponent } from '../comment/comment.component';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import Swal from 'sweetalert2';
import { BackendService } from '../../_services/backend/backend.service';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ReactiveFormsModule, CommentComponent, FeedbackComponent],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {

  idea: IdeaExtended; 
  backend = inject(BackendService); 
  ideasService = inject(IdeasService); 
  router = inject(Router);

  constructor () {
    this.idea = this.router.getCurrentNavigation()?.extras.state as IdeaExtended; 

  }

  commentForm = new FormGroup({
    commentText: new FormControl('',
      [Validators.minLength(2), Validators.maxLength(70)]), 
  }) 

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

  deleteComment(commentID: string){
    this.backend.deleteComment(this.idea.ideaID, commentID).subscribe({
      next: (response) => {
        console.log(response);
        this.updateIdeaAfterCommentDeleted(commentID); 
      }, 
      error: err => {
        console.log(err)
        Swal.fire({
          icon: "error", 
          text: err?.error?.message,
          timer: 1500,
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }, 
      complete: () => {
        Swal.fire({
          icon: "success", 
          text: "Commento Cancellato",
          showConfirmButton: false,
          timer: 1500, 
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }
    })
  }

  updateIdeaAfterCommentDeleted(commentID: string){
    this.idea.Comments = this.idea.Comments.filter(comment => comment.commentID !== commentID)
    this.idea.commentsNumber--; 
    this.ideasService.updateIdea(this.idea); 
  }

  postNewCommentAction(){
    if(this.commentForm.valid){
      let commentText = this.commentForm.value.commentText; 
      console.log(commentText); 
      if(commentText != undefined){
        this.postNewComment(commentText); 
        this.commentForm.get('commentText')?.setValue(''); 
      } else {
        Swal.fire({
          icon: "error", 
          text: "Errore nel caricamento del commento, riprovare più tardi...", 
          timer: 1500,
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }
    }
  }

  postNewComment(commentText: string){
    this.backend.postComments(this.idea.ideaID, commentText).subscribe({
      next: response => {
        console.log(response); 
        const newComment: Comment = response.data as Comment; 
        this.idea.Comments.push(newComment); 
        this.idea.commentsNumber++; 
        this.ideasService.updateIdea(this.idea); 
      }, 
      error: err => {
        Swal.fire({
          icon: "error",
          title: err?.error?.message,
          showConfirmButton: false, 
          timer: 1500,
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }, 
      complete: () => {
        Swal.fire({
          icon: "success",
          title: "Commento Caricato...",
          showConfirmButton: false, 
          timer: 1500,
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }
    })
  }


}
