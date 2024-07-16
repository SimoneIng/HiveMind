import { Component, Input, inject, computed, Output, EventEmitter } from '@angular/core';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { UserService } from '../../_services/user/user.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { FeedbacksService } from '../../_services/feedbacks/feedbacks.service';
import { CommentsSectionComponent } from "../comments-section/comments-section.component";
import { Comment } from '../../_models/Comment.type';
import { CommentSectionService } from '../../_services/commentSection/comment-section.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [CommonModule, RouterLink, CommentsSectionComponent, MarkdownComponent],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  @Input({required: true}) idea: IdeaExtended; 
  @Output() ideaDeleted: EventEmitter<string> = new EventEmitter<string>() 

  user = inject(UserService)
  backend = inject(BackendService)
  ideasService = inject(IdeasService)
  feedbacksService = inject(FeedbacksService)
  commentSectionService = inject(CommentSectionService)

  isCommentsSectionOpen: boolean = false; 

  upvoteIsSet = computed(() => this.feedbacksService.getUpvoteFeedback(this.idea.ideaID))
  downvoteIsSet = computed(() => this.feedbacksService.getDownVoteFeedback(this.idea.ideaID))

  ngOnInit(){
      const userFeedback = this.idea.Feedbacks.find(feedback => feedback.userID == this.user.userID())
      if(userFeedback){
        this.feedbacksService.addFeedback(userFeedback.ideaID, userFeedback.flag)
      }
  }
    
  setFeedback(value: boolean){
    this.backend.postFeedback(this.idea.ideaID, value).subscribe({
      next: (response) => {
        console.log("ciao", response)
        value ? this.idea.upVotes++ : this.idea.downVotes++;
        this.ideasService.updateIdea(this.idea)
        this.feedbacksService.addFeedback(this.idea.ideaID, value)
      }, error: err => {
        console.log(err) 
          Swal.fire({
            icon: "error",
            title: err?.error?.message,
            showConfirmButton: false, 
            timer: 1500
          })
      }, complete: () => {
          Swal.fire({
            icon: "success",
            title: "Hai inserito un Feedback",
            showConfirmButton: false, 
            timer: 1500 
          })
      }
    })
  }
  
  showDeleteButton(){
    if(this.idea.User.userName === this.user.username()){
      return false 
    } else return true 
  }

  deleteIdea(){
    this.backend.deleteIdea(this.idea.ideaID).subscribe({
      next: (response) => {
        console.log(response)
        this.ideasService.deleteIdea(this.idea.ideaID)
      }, 
      error: err => {
        console.log(err)
        Swal.fire({
          icon: "error",
          title: err?.error?.message,
          showConfirmButton: false, 
          timer: 1500 
        })
      }, complete: () => {
          Swal.fire({
            icon: "success",
            title: "Idea Eliminata",
            showConfirmButton: false, 
            timer: 1500 
          })
          this.ideaDeleted.emit(this.idea.ideaID)
      }
    })
  }

  deleteIdeaAction(){
    Swal.fire({
      title: "Attenzione",
      text: "Stai per cancellare la tua Idea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancella",
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteIdea();
      }
    });
  }
 
  toggleCommentsSection(){ // obiettivo: Evitare l'apertura contemporanea di più commentSections 
    if(this.isCommentsSectionOpen){ // sezione commenti è aperta, la devo chiudere 
      this.isCommentsSectionOpen = false;  
      // imposto il signal all'interno del service a false, per indicare che ho chiuso la sezione commenti
      this.commentSectionService.aCommentSectionIsOpen.set(false); 
    } else { // sezione commenti è chiusa : la devo aprire 
      // controllare se non ce ne sia un'altra già aperta 
      if(!this.commentSectionService.aCommentSectionIsOpen()){ // se nessuna sezione commenti è aperta 
        // impostare il signal a true per indicare che qualcuno ha aperto la sezione commenti
        this.commentSectionService.aCommentSectionIsOpen.set(true); 
        // apro la sezione commenti 
        this.isCommentsSectionOpen = true; 
      }
    }
  }

  updateIdeaAfterCommentCreated(newComment: Comment){
    this.idea.Comments.push(newComment); 
    this.idea.commentsNumber++; 
    this.ideasService.updateIdea(this.idea); 
  }

  updateIdeaAfterCommentDeleted(commentID: string){
    const index = this.idea.Comments.findIndex(comment => comment.commentID == commentID)
    if(index !== -1) this.idea.Comments.splice(index, 1); 
    this.idea.commentsNumber--; 
    this.ideasService.updateIdea(this.idea); 
  }

}
