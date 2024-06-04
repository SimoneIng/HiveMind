import express from 'express'; 
import cors from 'cors'; 
import { authRouter, commentsRouter, usersRouter, ideasRouter, feedbacksRouter } from './routes/index.js'; 
import syncDatabase from './config/syncDB.js';
import { SERVER_PORT } from './config/environment.js';

const app = express(); 
 

// creazione tabelle del database richiamando il metodo  syncDatabase()

// middlewares 
app.use(express.json())
app.use(cors())

// routes 
app.use(authRouter)
app.use(commentsRouter)
app.use(usersRouter)
app.use(ideasRouter)
app.use(feedbacksRouter)

// default error handler 
app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred"
    });
  });

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`); 
})