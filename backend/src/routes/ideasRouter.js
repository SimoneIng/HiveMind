import express from 'express'; 
import { IdeaController, CommentController, FeedbackController } from '../controllers/index.js'; 
import { userIsAuth } from '../middlewares/authorization.js'; 

const ideasRouter = express.Router(); 

// ogni route viene montata con /ideas nel mail file di express 

    ideasRouter.get('/ideas', userIsAuth, (req, res, next) => {
        IdeaController.getIdeas().then( ideas => {
            res.status(200).json({
                message: 'Ideas Fetched Successfully', 
                length: ideas.length, 
                data: ideas
            })
        }).catch( err => {
            next({message: 'Failed to fetch ideas.'})
        })
    })

    ideasRouter.post('/ideas', userIsAuth, (req, res, next) => {
        IdeaController.uploadIdea(req).then( idea => {
            res.status(201).json({
                message: 'Idea Uploaded Successfully',
                data: idea
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.delete('/ideas/:ideaId', userIsAuth, (req, res, next) => {
        IdeaController.deleteIdeaById(req).then( deletedIdea => {
            res.status(200).json({
                message: 'Idea Deleted Successfully',
                data: deletedIdea
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.get('/ideas/:ideaId/comments', userIsAuth, (req, res, next) => {
        CommentController.getCommentsByIdeaId(req).then( comments => {
            res.status(200).json({
                message: 'Comments Fetched Successfully',
                length: comments.length,
                data: comments
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.post('/ideas/:ideaId/comments', userIsAuth, (req, res, next) => {
        CommentController.uploadCommentToIdea(req).then( comment => {
            res.status(201).json({
                message: 'Comment Uploaded Successfully',
                data: comment
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.delete('/ideas/:ideaId/comments/:commentId', userIsAuth, (req, res, next) => {
        CommentController.deleteCommentToIdea(req).then( deletedComment => {
            res.status(200).json({
                message: 'Comment Deleted Successfully',
                data: deletedComment 
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.get('/ideas/:ideaId/feedbacks', userIsAuth, (req, res, next) => {
        FeedbackController.getFeedbacksByIdeaId(req).then( feedbacks => {
            res.status(200).json({
                message: 'Feedbacks Fetched Successfully', 
                length: feedbacks.length,
                data: feedbacks 
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.post('/ideas/:ideaId/feedbacks', userIsAuth, (req, res, next) => {
        FeedbackController.uploadFeedbackToIdea(req).then( feedback => {
            res.status(201).json({
                message: 'Feedback Uploaded Successfully',
                data: feedback
            })
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.delete('/ideas/:ideaId/feedbacks/:feedbackId', userIsAuth, (req, res, next) => {
        FeedbackController.deleteFeedbackById(req).then( deletedFeedback => {
            res.status(200).json({
                message: 'Feedback Deleted Successfully', 
                data: deletedFeedback
            })
        }).catch( err => {
            next(err)
        })
    })

    
export default ideasRouter;