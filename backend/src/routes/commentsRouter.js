import express from 'express'; 

const commentsRouter = express.Router(); 

    commentsRouter.get('/comments', (req, res)=> {
        res.send('comments router')
    })


export default commentsRouter;