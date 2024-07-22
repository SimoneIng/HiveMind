import { Component, Input, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksService } from '../../_services/feedbacks/feedbacks.service';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { UserService } from '../../_services/user/user.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {

  @Input({required: true}) idea: IdeaExtended; 

  user = inject(UserService); 
  backend = inject(BackendService); 
  ideasService = inject(IdeasService); 
  feedbacksService = inject(FeedbacksService); 

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
            timer: 1500,
            customClass: {
              popup: 'swal2-popup',
              title: 'swal2-title',
              actions: 'swal2-actions',
              confirmButton: 'swal2-confirm',
              cancelButton: 'swal2-cancel'
            }
          })
      }, complete: () => {
          Swal.fire({
            icon: "success",
            title: "Hai inserito un Feedback",
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
