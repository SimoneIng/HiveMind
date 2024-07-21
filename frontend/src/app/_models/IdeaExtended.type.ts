import { Feedback } from "./Feedback.type";
import { Comment } from "./Comment.type";
import { Idea } from "./Idea.type";

export interface IdeaExtended extends Idea {
    User: {
        userName: string | null, 
        profileImagePath: string | null,
        profileCreatedAt: Date | null
    },
    Comments: Comment []
    Feedbacks: Feedback [] 
}