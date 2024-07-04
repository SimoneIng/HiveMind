import { Injectable, computed, signal, WritableSignal, inject } from '@angular/core';
import { IdeaWithUsers } from '../../_models/IdeaWithUsers.type';
import { GenericGetResponse } from '../../_models/GenericGetResponse.type';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  ideasState: WritableSignal<IdeaWithUsers[]> = signal<IdeaWithUsers[]>([])
  
  
  length = computed(() => this.getLength())
  ideas = computed(() => this.ideasState())

  constructor(){}

  getLength(): number {
    return this.ideas.length; 
  }

  setIdeas(response: GenericGetResponse) {
    this.ideasState.set(response.data as IdeaWithUsers[])
  }

  addIdea(newIdea: IdeaWithUsers){
    this.ideasState.update(currentIdeas => [...currentIdeas, newIdea])
  }

  updateIdea(updatedIdea: IdeaWithUsers){
    this.ideasState.update(currentIdeas => 
      currentIdeas.map(idea => idea.ideaID === updatedIdea.ideaID ? updatedIdea : idea)
    )
  }

  deleteIdea(ideaID: string){
    this.ideasState.update(currentIdeas => currentIdeas.filter(idea => idea.ideaID !== ideaID))
  }

}

