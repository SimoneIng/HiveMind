import { Component, Input, inject, computed, effect, OnInit } from '@angular/core';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { UserService } from '../../_services/user/user.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { FeedbacksService } from '../../_services/feedbacks/feedbacks.service';


@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  @Input({required: true}) idea: IdeaExtended; 

  user = inject(UserService)
  backend = inject(BackendService)
  ideasService = inject(IdeasService)
  feedbacksService = inject(FeedbacksService)

  upvoteIsSet = computed(() => this.feedbacksService.getUpvoteFeedback(this.idea.ideaID))
  downvoteIsSet = computed(() => this.feedbacksService.getDownVoteFeedback(this.idea.ideaID))

  ngOnInit(){

      const userFeedback = this.idea.Feedbacks.find(feedback => feedback.userID == this.user.userID())
      if(userFeedback){
        this.feedbacksService.addFeedback(userFeedback.ideaID, userFeedback.flag)
      }

  }

  isIdeaOfUser() {
    if(this.user.userID() === this.idea.userID){
      return true 
    } else {
      return false 
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
      confirmButtonText: "Cancella"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteIdea();
      }
    });
  }
 
  openComments(){

  }

}
