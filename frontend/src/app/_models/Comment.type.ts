export interface Comment {
    User: {
        userName: string | null, 
        profileImagePath: string
    }, 
    commentID: string, 
    createdAt: Date,
    description: string, 
    ideaID: string, 
    userID: string, 
}