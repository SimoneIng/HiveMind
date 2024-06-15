import express from 'express'; 
import { userIsAuth } from '../middlewares/authorization.js';

const usersRouter = express.Router(); 

    usersRouter.get('/users/:userId', userIsAuth, (req, res, next) => {

    })

    usersRouter.put('/users/:userId', userIsAuth, (req, res, next) => {

    })

    usersRouter.delete('/users/:userId', userIsAuth, (req, res, next) => {

    })


export default usersRouter;