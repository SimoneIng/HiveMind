import { Component, Input, inject } from '@angular/core';
import { IdeaWithUsers } from '../../_models/IdeaWithUsers.type';
import { UserService } from '../../_services/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import Swal from 'sweetalert2';
import { IdeasService } from '../../_services/ideas/ideas.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  @Input({required: true}) idea: IdeaWithUsers; 

  user = inject(UserService)
  backend = inject(BackendService)
  ideasService = inject(IdeasService)

  openComments(){

  }

  giveFeedback(value: boolean){
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

  
  showDeleteButton(){
    if(this.idea.User.userName === this.user.username()){
      return false 
    } else return true 
  }

}
