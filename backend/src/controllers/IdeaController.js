import { Idea } from "../models/index.js";


class IdeaController {
    
    static async getIdeas(){
        return Idea.findAll()
    }

    static async getIdeaById(ideaID){
        return Idea.findByPk(ideaID)
    }

    static async getIdeasByuserID(req){

    }

    static async uploadIdea(req){
         let newIdea = {
            title: req.body.title,
            description: req.body.description, 
            userID: req.userID 
         }
         console.log(newIdea)
         return Idea.create(newIdea)
    }

    static async deleteIdeaById(req){
        // trova l'idea da cancellare 
        let ideaToDelete = await this.getIdeaById(req.params.id)
        
        if(!ideaToDelete){
           throw new Error('Resource not exists') 
        } else {
            if(ideaToDelete.userID !== req.userID){
                throw new Error('You do not have permission to delete the resource')
            } else {
                await Idea.destroy({ where: { ideaID: ideaToDelete.ideaID }})
                return ideaToDelete 
            }
        }
    }

}


export default IdeaController; 