import { User } from "./User.type"

export interface LoginResponse {
    message: string, 
    user: {
        userID: string, 
        userName: string, 
        Ideas: [] 
    }, 
    token: string 
}