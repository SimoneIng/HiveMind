import express from 'express'; 

const usersRouter = express.Router(); 

    usersRouter.get('/users', (req, res)=> {
        res.send('user router')
    })


export default usersRouter;