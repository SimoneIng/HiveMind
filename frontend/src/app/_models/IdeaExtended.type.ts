import { Feedback } from "./Feedback.type";
import { Idea } from "./Idea.type";

export interface IdeaExtended extends Idea {
    User: {
        userName: string, 
        profileImagePath: string
    },
    Comments: Comment []
    Feedbacks: Feedback [] 
}