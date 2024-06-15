import HttpError from "../config/HttpError.js";
import connection from "../config/connection.js";
import { Comment, User, Idea } from "../models/index.js";

class CommentController {
    
    static async getCommentsByIdeaId(req){
        return Comment.findAll({
            where: {
                ideaID: req.params.ideaId
            },
            include: [{
                model: User, 
                attributes: {
                    exclude: ['userID','passwordHash']
                }
            }]
        })
    }

    static async uploadCommentToIdea(req){

        const idea = await Idea.findOne({
            where: { ideaID: req.params.ideaId }
        })

        if(!idea)
            throw new HttpError(400, 'Idea Not Exists.')

        const newComment = {
            ideaID: idea.ideaID, 
            userID: req.userId, 
            description: req.body.description 
        }

        // inizio transaction 
        const t = await connection.transaction(); 

        try {
            
            Comment.create(newComment, {transaction: t})

            idea.commentsNumber++; 
            await idea.save({transaction: t}); 

            await t.commit(); 
        } catch (err) {
            console.log(err)
            await t.rollback(); 
            throw new HttpError(503, 'Comment Not Uploaded, Try Later.')
        }

        return newComment; 
        
    }

    static async deleteCommentToIdea(req){

        let commentToDelete = await Comment.findOne({
            where: { commentID: req.params.commentId }, 
            include: [{ model: Idea }]
        })

        if(!commentToDelete) 
            throw new HttpError(404, 'Comment do not Exists'); 
        if(req.params.ideaId != commentToDelete.ideaID) 
            throw new HttpError(400,'The Comment is not related to this Idea'); 
        if(req.userId != commentToDelete.userID)
            throw new HttpError(403, 'You do not have permission to remove this Comment')

        // inizio transaction 
        const t = await connection.transaction(); 

        try {

            const idea = commentToDelete.Idea; 
            idea.commentsNumber--; 

            await idea.save({transaction: t}); 
            await commentToDelete.destroy({transaction: t});
            
            t.commit()
        } catch (err) {
            console.log(err)
            await t.rollback(); 
            throw new HttpError(503, 'Unable to Delete Comment, try later.')
        }
        
        return commentToDelete; 

    }

}

export default CommentController; 