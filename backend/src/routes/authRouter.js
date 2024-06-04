import express from 'express'; 
import { AuthController } from '../controllers/index.js';

const authRouter = express.Router(); 

    authRouter.post('/login', async (req, res) => {
        let isAuth = await AuthController.checkCredentials(req, res); 
        console.log('isAuth', isAuth.userID)
        if(isAuth){ // isAuth è un istanza di User 
            res.json(AuthController.issueToken(isAuth.userID))
        } else {
            res.status(401)
            res.json({
                error: 'Invalid Credentials, try again.'
            })
        }
    }) 

    authRouter.post('/registration', async (req, res, next) => {
        AuthController.saveNewUser(req, res).then( newUser => {
            res.json(newUser)
        }).catch( err =>{
            next({
                status: 500, message: 'Could Not save User'
            })
        })
    })


export default authRouter;