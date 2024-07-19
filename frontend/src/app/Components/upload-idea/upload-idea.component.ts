import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../../_services/backend/backend.service';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MarkdownModule } from 'ngx-markdown';
import { Idea } from '../../_models/Idea.type';
import { GenericResponse } from '../../_models/GenericResponse.type';

@Component({
  selector: 'app-upload-idea',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule], 
  templateUrl: './upload-idea.component.html',
  styleUrl: './upload-idea.component.scss'
})
export class UploadIdeaComponent {

  @ViewChild('descriptionTextArea') descriptionTextArea: ElementRef; 

  router = inject(Router); 
  userService = inject(UserService); 
  ideasService = inject(IdeasService); 
  backendService = inject(BackendService)

  selectedText: string = ''; 

  uploadIdeaForm = new FormGroup({
    title: new FormControl('',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    description: new FormControl('',
      [Validators.required, Validators.minLength(5), Validators.maxLength(400)]
    ) 
  }) 

  headingToggle(heading: number){

    switch(heading) {
      case 1: 
        this.replaceSelectedText(`#${this.selectedText}`)
      break; 
      case 2: 
      this.replaceSelectedText(`##${this.selectedText}`)
      break; 
      case 3: 
      this.replaceSelectedText(`###${this.selectedText}`)
      break; 
    }  

  }

  boldToggle(){
    this.replaceSelectedText(`**${this.selectedText}**`)
  }

  italicToggle(){
    this.replaceSelectedText(`*${this.selectedText}*`)
  }

  unOrderedListToggle(){
    this.replaceSelectedText(`\n - ${this.selectedText}`)
  }

  codeToggle(){
    this.replaceSelectedText(`\' ${this.selectedText} \'`)
  }

  undoAction(){

  }

  redoAction(){
    
  }

  getSelectedText(event: Event){
    let selection = window.getSelection(); 
    let text = selection?.toString().trim();

    if(text !== '' && text !== undefined){
      this.selectedText = text; 
    } 
  }

  replaceSelectedText(modifiedText: string){
    
    let textarea = this.descriptionTextArea.nativeElement; 
    let start = textarea.selectionStart; 
    let end = textarea.selectionEnd; 

    if (start !== undefined && end !== undefined) {
      let newText = modifiedText;
      let textBefore = textarea.value.substring(0, start);
      let textAfter = textarea.value.substring(end, textarea.value.length);

      textarea.value = textBefore + newText + textAfter;
    
      // Imposta il cursore alla fine del nuovo testo inserito
      textarea.selectionStart = start + newText.length;
      textarea.selectionEnd = start + newText.length;
    }
  }

  updateLocalStorageOnIdeaUploaded(response: GenericResponse){
    const ideas = this.userService.getIdeas(); 
    const newIdea = {
      ...response.data as Idea , 
      User: {
        userName: this.userService.getUsername(),
        profileImagePath: this.userService.getProfileImagePath()
      }, Comments: [], Feedbacks: [], 
    }
    ideas.push(newIdea); 
    localStorage.setItem("User-Ideas", JSON.stringify(ideas)); 
  }
  
  uploadIdea() {
    if(!this.uploadIdeaForm.invalid){
      const title = this.uploadIdeaForm.value.title as string; 
      const description = this.uploadIdeaForm.value.description as string; 
      this.backendService.postIdea(title, description).subscribe({
        next: (response) => {
          console.log(response)
          // aggiornare il localStorage 
          this.updateLocalStorageOnIdeaUploaded(response); 
        },
        error: err => {
          Swal.fire({
            icon: "error",
            title: "Errore nel caricamento dell'idea..",
            text: err?.error?.message, 
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
            title: "Idea Caricata...",
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
      this.router.navigateByUrl("/Home"); 
    }
  }



}
