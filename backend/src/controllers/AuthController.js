import { Idea, User } from "../models/index.js";
import { JWT_SECRET } from '../config/environment.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 


class AuthController {

    // controllo delle credenziali sul database 
    static async checkCredentials(req){
         const user = await User.findOne({
            where: {
                userName: req.body.usr, 
            },
            include: [{
                model: Idea
            }]
        })

        // match password inserita, con la password criptata sul database  
        const passwordMatch = await bcrypt.compare(req.body.psw, user.passwordHash)

        if(passwordMatch) {
            user.passwordHash = ''; 
            return user; 
        } else return null; 

    }

    // creazione nuovo utente nel database (registrazione)
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
        return jwt.sign({userID}, JWT_SECRET, { expiresIn: `${24*60*60}s` })
    }

    // verifica validità token 
    static isTokenValid(token, callback){
        jwt.verify(token, JWT_SECRET, callback); 
    }

}

export default AuthController; 