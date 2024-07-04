import { Component, inject } from '@angular/core';
import { BackendService } from '../../_services/backend/backend.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { IdeaComponent } from '../idea/idea.component';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [IdeaComponent],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent {

  backend = inject(BackendService)
  ideasService = inject(IdeasService)

  constructor(){
    this.backend.getIdeas().subscribe({
      next: (response) => {
        console.log(response)
        this.ideasService.setIdeas(response)
      },
      error: err => {
        console.log(err)
      }, 
      complete: () => {

      }
    })
  }


}
