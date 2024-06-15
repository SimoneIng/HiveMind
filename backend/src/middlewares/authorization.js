import { AuthController } from "../controllers/index.js";

// verifica il token JWT nelle richieste HTTP 
export function userIsAuth(req, res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(!token){
        next({
            statusCode: 401, message: 'Unauthorized'
        })
        return; 
    } else {
        AuthController.isTokenValid(token, (err, decodedToken) => {
            if(err){
                next({
                    statusCode: 401, message: 'Unauthorized, JWT Token not valid'
                })
            } else { 
                console.log(decodedToken)
                req.userId = decodedToken.userID; // essenziale per le query sul database
                next(); 
            }
        })
    }

}
