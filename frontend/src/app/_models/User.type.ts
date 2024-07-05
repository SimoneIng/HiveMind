import { Idea } from "./Idea.type";

export interface User {
    userID: string, 
    username: string | null, 
    ideas: Idea[] | null 
}