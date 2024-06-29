import express from 'express'; 
import { AuthController } from '../controllers/index.js';

const authRouter = express.Router(); 

    authRouter.post('/auth/login', async (req, res, next) => {
        let authUser = await AuthController.checkCredentials(req); 
       
        if(authUser != null){ // isAuth è un istanza di User 
            res.status(200).json({
                    message: 'Successfull Login', 
                    user: authUser, token: AuthController.issueToken(authUser.userID)
            })
        } else {
            next({status: 401, message: 'Invalid Credentials'})
        }
    }) 

    authRouter.post('/auth/registration', async (req, res, next) => {
        AuthController.saveNewUser(req, res).then( newUser => {
            res.status(201).json({ message: 'User Created', newUser})
        }).catch( err =>{
            console.log(err)
            next({message: 'Could Not save User'})
        })
    })

    authRouter.post('/auth/refresh', async (req, res, next) => {

    })

    authRouter.post('/auth/logout', async (req, res, next) => {
        
    })


export default authRouter;