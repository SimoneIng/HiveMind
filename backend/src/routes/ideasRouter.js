import express from 'express'; 
import { IdeaController } from '../controllers/index.js'; 
import { userIsAuth } from '../middlewares/authorization.js'; 

const ideasRouter = express.Router(); 

    ideasRouter.get('/ideas', userIsAuth, (req, res, next) => {
        IdeaController.getIdeas().then( ideas => {
            res.send(ideas); 
        }).catch( err => {
            next({
                message: 'Failed to load ideas'
            })
        })
    })

    ideasRouter.post('/ideas', userIsAuth, (req, res, next) => {
        IdeaController.uploadIdea(req).then( result => {
            res.send(result)
        }).catch( err => {
            next(err)
        })
    })

    ideasRouter.delete('/ideas/:id', userIsAuth, (req, res, next) => {
        IdeaController.deleteIdeaById(req).then( result => {
            res.send(result)
        }).catch( err => {
            next(err)
        })
    })


export default ideasRouter;