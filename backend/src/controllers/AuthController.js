import { Idea, User } from "../models/index.js";
import { JWT_SECRET } from '../config/environment.js'; 
import jwt from 'jsonwebtoken'; 


class AuthController {

    static hashPassword(psw) { // implementare meccanismo di password hashing 
        return psw; 
    }

    // controllo delle credenziali sul database 
    static async checkCredentials(req){
         return User.findOne({
            where: {
                userName: req.body.usr, 
                passwordHash: this.hashPassword(req.body.psw)
            },
            include: [{
                model: Idea
            }]
        })

    }

    // creazione nuovo utente nel database (registrazione)
    static async saveNewUser(req, res){

        // crea un nuovo user e prova a salvarlo sul database
        let newUser = await User.create({
            userName: req.body.usr, 
            passwordHash: this.hashPassword(req.body.psw)
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