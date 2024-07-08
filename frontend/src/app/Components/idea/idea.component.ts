import { Component, Input, inject, computed, effect } from '@angular/core';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { UserService } from '../../_services/user/user.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { Feedback } from '../../_models/Feedback.type';


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

  setFeedback(value: boolean){
    this.backend.postFeedback(this.idea.ideaID, value).subscribe({
      next: (response) => {
        value ? this.idea.upVotes++ : this.idea.downVotes++;
        this.ideasService.updateIdea(this.idea)
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

  findUserFeedback(){
    const userFeedback = this.idea.Feedbacks.find(feedback => feedback.userID === this.user.userID())
    if(userFeedback != undefined) return userFeedback.flag
    return false
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
