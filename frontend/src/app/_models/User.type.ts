import { Idea } from "./Idea.type";

export interface User {
    userID: string | null, 
    username: string | null, 
    ideas: Idea[] | null 
}