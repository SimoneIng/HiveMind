import { User } from "./User.type"

export interface LoginResponse {
    message: string, 
    user: {
        userName: string, 
        Ideas: [] 
    }, 
    token: string 
}