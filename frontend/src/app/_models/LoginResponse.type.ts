import { IdeaExtended } from "./IdeaExtended.type"
import { User } from "./User.type"

export interface LoginResponse {
    message: string, 
    user: {
        userID: string, 
        userName: string, 
        profileImagePath: string, 
        profileCreatedAt: Date,
        Ideas: IdeaExtended [] 
    }, 
    token: string 
}