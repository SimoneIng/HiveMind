import { Component, inject } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';


@Component({
  selector: 'app-upload-idea',
  standalone: true,
  imports: [MarkdownComponent, ReactiveFormsModule],
  templateUrl: './upload-idea.component.html',
  styleUrl: './upload-idea.component.scss'
})
export class UploadIdeaComponent {

  userService = inject(UserService); 
  ideasService = inject(IdeasService); 
  

  uploadIdeaForm = new FormGroup({
    title: new FormControl('',
      [Validators.minLength(10), Validators.maxLength(30)]),
    description: new FormControl('',
      [Validators.minLength(10), Validators.maxLength(400)]
    ) 
  }) 

  
  uploadIdea() {

  }

}
