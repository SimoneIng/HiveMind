import { Idea, User, Feedback, Comment } from "../models/index.js";
import HttpError from '../config/HttpError.js'; 

class IdeaController {
    
    static async getIdeas(){
        return Idea.findAll({
            include: [{
                model: User, 
                attributes: {
                    exclude: ['userID','passwordHash']
                }, 
            }, { model: Comment }, { model: Feedback }
        ]
        })
    }

    static async getIdeaById(req){
        return Idea.findByPk(req.params.ideaId)
    }

    static async uploadIdea(req){
         const newIdea = {
            title: req.body.title,
            description: req.body.description, 
            userID: req.userId 
         }
         return Idea.create(newIdea)
    }

    static async deleteIdeaById(req){
        // trova l'idea da cancellare 
        const ideaToDelete = await this.getIdeaById(req)
        
        if(!ideaToDelete) 
            throw new HttpError(404, 'Idea Not Found'); 
        if(req.userId != ideaToDelete.userID)
            throw new HttpError(403, 'You do not have permission to delete this Idea.'); 

        await ideaToDelete.destroy(); 
        return ideaToDelete; 

    }

}

export default IdeaController; 