import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionService {

  constructor() { }

  aCommentSectionIsOpen: WritableSignal<boolean> = signal<boolean>(false)
  
  isACommentSectionOpen(){
    return this.aCommentSectionIsOpen(); 
  }

}
