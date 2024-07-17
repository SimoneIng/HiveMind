import { IdeaExtended } from "./IdeaExtended.type"

export interface User {
    userID: string | null, 
    username: string | null, 
    profileImagePath: string | null, 
    ideas: IdeaExtended[] | null 
}