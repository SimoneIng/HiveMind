import { AuthController } from "../controllers/index.js";

// verifica il token JWT nelle richieste HTTP 
export function userIsAuth(req, res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(!token){
        next({
            status: 401, message: 'Unauthorized'
        })
        return; 
    } else {
        AuthController.isTokenValid(token, (err, decodedToken) => {
            if(err){
                next({
                    status: 401, message: 'Unauthorized, JWT Token not valid'
                })
            } else { 
                req.userID = decodedToken.userID; // essenziale per le query sul database
                next(); 
            }
        })
    }

}
