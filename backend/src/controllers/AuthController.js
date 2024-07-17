import { Idea, User, Feedback, Comment } from "../models/index.js";
import { JWT_SECRET } from '../config/environment.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import HttpError from "../config/HttpError.js";


class AuthController {


    static async checkCredentials(req){

        const user = await User.findOne({
            where: {
                userName: req.body.usr,
            },
            include: [{
                model: Idea,
                include: [
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: {
                                    exclude: ['userID', 'passwordHash']
                                }
                            }
                        ]
                    },
                    {
                        model: Feedback
                    }, 
                    {
                        model: User, attributes: { exclude: ['userID','passwordHash'] }
                    }
                ]
            }], 
        });

        if(!user) return null; 

        // match password inserita, con la password criptata sul database  
        const passwordMatch = await bcrypt.compare(req.body.psw, user.passwordHash)

        if(passwordMatch) return user; 
        else return null; 

    }
    
    static async saveNewUser(req, res){

        // crea un nuovo user e prova a salvarlo sul database
        let newUser = await User.create({
            userName: req.body.usr, 
            passwordHash: req.body.psw
        })
        return newUser; 
    }

    // rilascio token JWT dal Server 
    static issueToken(userID){
        return jwt.sign({userID}, JWT_SECRET, { expiresIn: `30m` })
    }

    // verifica validità token 
    static isTokenValid(token, callback){
        jwt.verify(token, JWT_SECRET, callback); 
    }

    static refreshToken(req){
        const authHeader = req.headers['authorization']; 
        const token = authHeader?.split(' ')[1]; 

        if(!token){
            throw new HttpError(401, "Unauthorized"); 
        } else {
            const newToken = 
            jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                if(err){
                    throw new HttpError(401, "Token Not Valid"); 
                } else {
                    const userID = decodedToken.userID; 
                    return jwt.sign({userID}, JWT_SECRET, {expiresIn: `30m` }); 
                }
            }) 
            return newToken; 
        }
    }

}

export default AuthController; 