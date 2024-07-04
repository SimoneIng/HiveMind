import { Idea } from "./Idea.type";

export interface IdeaWithUsers extends Idea {
    User: {
        userName: string, 
        profileImagePath: string
    }
}