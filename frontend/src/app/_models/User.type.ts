import { Idea } from "./Idea.type";

export interface User {
    username: string | null, 
    ideas: Idea[] | null 
}