import { computed, Injectable, WritableSignal, signal, effect } from '@angular/core';
import { Feedback } from '../../_models/Feedback.type';


interface storedFeedback {
  ideaID: string, 
  flag: boolean 
}

@Injectable({
  providedIn: 'root'
})


export class FeedbacksService {

  feedbacksSignal: WritableSignal<storedFeedback[]> = signal<storedFeedback[]>(
    this.loadFeedbacksFromLocalStorage()
  )

  constructor(){
    effect(() => {
      const userFeedbacks = this.feedbacksSignal(); 

      if(userFeedbacks != null){
        localStorage.setItem("userFeedbacks", JSON.stringify(userFeedbacks))
      } else {
        localStorage.removeItem("userFeedbacks")
      }
    })
  }

  loadFeedbacksFromLocalStorage(): storedFeedback[] {
    const feedbacks = localStorage.getItem("userFeedbacks")
    if(feedbacks){
      return JSON.parse(feedbacks)
    } else return []; 
  }

  getUpvoteFeedback(ideaID: string): boolean {
    const feedbacks = this.feedbacksSignal(); 
    const feedback = feedbacks.find(feedback => feedback.ideaID == ideaID)
    if(feedback != undefined && feedback.flag == true){
      return true 
    } else return false; 
  }

  getDownVoteFeedback(ideaID: string): boolean | null {
    const feedbacks = this.feedbacksSignal(); 
    const feedback = feedbacks.find(feedback => feedback.ideaID == ideaID)
    if(feedback != undefined && feedback.flag == false){
      return true; 
    } else return false; 
  }

  addFeedback(ideaID: string, flag: boolean){
    const newFeedback: storedFeedback = { ideaID, flag }
    const currentFeedbacks = this.feedbacksSignal(); 
    const updatedFeedbacks = [...currentFeedbacks, newFeedback]
    this.feedbacksSignal.set(updatedFeedbacks)
  }

  removeFeedback(ideaID: string){
    const currentFeedbacks = this.feedbacksSignal(); 
    const updatedFeedbacks = currentFeedbacks.filter(feedback => feedback.ideaID !== ideaID); 
    this.feedbacksSignal.set(updatedFeedbacks); 
  }

  clearStorageOnLogout(){
    this.feedbacksSignal.set([]); 
  }

}


