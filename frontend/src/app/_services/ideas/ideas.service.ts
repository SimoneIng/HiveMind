import { Injectable, computed, signal, WritableSignal, inject } from '@angular/core';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import { GenericGetResponse } from '../../_models/GenericGetResponse.type';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  ideasState: WritableSignal<IdeaExtended[]> = signal<IdeaExtended[]>([])
  
  
  length = computed(() => this.getLength())
  ideas = computed(() => this.ideasState())

  constructor(){}

  getLength(): number {
    return this.ideas.length; 
  }

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

