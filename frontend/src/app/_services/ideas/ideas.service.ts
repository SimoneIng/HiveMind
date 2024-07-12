import { Injectable, computed, signal, WritableSignal, inject } from '@angular/core';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { GenericGetResponse } from '../../_models/GenericGetResponse.type';
import { Comment } from '../../_models/Comment.type';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  ideasState: WritableSignal<IdeaExtended[]> = signal<IdeaExtended[]>([])
  
  ideas = computed(() => this.ideasState())

  constructor(){}

  setIdeas(response: GenericGetResponse) {
    this.ideasState.set(response.data as IdeaExtended[])
  }

  addIdea(newIdea: IdeaExtended){
    this.ideasState.update(currentIdeas => [...currentIdeas, newIdea])
  }

  updateIdea(updatedIdea: IdeaExtended){
    this.ideasState.update(currentIdeas => 
      currentIdeas.map(idea => idea.ideaID === updatedIdea.ideaID ? updatedIdea : idea)
    )
  }

  deleteIdea(ideaID: string){
    this.ideasState.update(currentIdeas => currentIdeas.filter(idea => idea.ideaID !== ideaID))
  }

}

