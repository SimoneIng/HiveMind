import { Feedback, User, Idea } from "../models/index.js";
import connection from "../config/connection.js";
import ideasRouter from "../routes/ideasRouter.js";
import HttpError from "../config/HttpError.js";

// controllo inserimento unico feedback per ogni idea (per utente)
// aggiornamento 

class FeedbackController {

    static async getFeedbacksByIdeaId(req){
        return Feedback.findAll({ 
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

    static async uploadFeedbackToIdea(req){
        
        const idea = await Idea.findOne({
            where: { ideaID: req.params.ideaId }, 
            include: [{ model: Feedback }]
        })
        
        if(!idea) throw new HttpError(400,'Idea Not Exists')
        
        // controlla che il feedback da parte di quell utente non sia stato già inserito 
        idea.Feedbacks.forEach( feedback => {
            if(feedback.userID == req.userId) 
                throw new HttpError(400, 'You have Already Insert a Feedback to this Idea')
        })

        const newFeedback = {
            ideaID: req.params.ideaId, 
            userID: req.userId, 
            flag: req.body.flag
        }
        
        // inizio transaction 
        const t = await connection.transaction(); 

        try{
            // crea il feedback dall'oggetto idea 
            await Feedback.create(newFeedback, {transaction: t})

            // in base alla natura del feedback aggiornare il campo contatore in idea 
            if(req.body.flag === true)
                idea.upVotes++; 
            else 
                idea.downVotes++; 

            await idea.save({transaction: t})

            await t.commit()
        } catch(err){
            console.log(err)
            await t.rollback(); 
            throw new HttpError(503, 'Feedback Not Uploaded, Try Later.')
        }

        return newFeedback; 

    }

    static async deleteFeedbackById(req){

        let feedbackToDelete = await Feedback.findOne({ 
            where: { feedbackID: req.params.feedbackId }, 
            include: [{ model: Idea }] 
        })

        if(!feedbackToDelete)
            throw new HttpError(404, 'Feedback Not Exists')
        if(req.params.ideaId != feedbackToDelete.ideaID)
            throw new HttpError(400, 'The Feedback is not related to this Idea')
        if(req.userId != feedbackToDelete.userID)
            throw new HttpError(403, 'You do not have permission to remove this Feedback')
        
        // inizio transaction 
        const t = await connection.transaction(); 

        try {
            const idea = feedbackToDelete.Idea; 
            
            if(feedbackToDelete.flag == true){
                idea.upVotes--; 
            }else{
                idea.downVotes--; 
            }

            await idea.save({transaction: t}) 
            await feedbackToDelete.destroy({transaction: t})

            await t.commit()
        } catch(err){
            console.log(err); 
            await t.rollback(); 
            throw new HttpError(503, 'Feedback Not Deleted, Try Later.')
        }

        return feedbackToDelete; 

    }

}

export default FeedbackController; 