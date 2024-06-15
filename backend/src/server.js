import express from 'express'; 
import cors from 'cors'; 
import { authRouter, usersRouter, ideasRouter } from './routes/index.js'; 
import syncDatabase from './config/syncDB.js';
import { SERVER_PORT } from './config/environment.js';

const app = express(); 
 

// creazione tabelle del database richiamando il metodo syncDatabase()

// middlewares 
app.use(express.json())
app.use(cors())

// routes 
app.use(authRouter)
app.use(ideasRouter)
app.use(usersRouter)

// default error handler 
app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.statusCode || 500)
    res.json({
        message: err.message || 'Internal Server Error' 
    })
  });

app.get('/', (req, res) => {
    res.redirect('/auth/login'); 
})


app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`); 
})