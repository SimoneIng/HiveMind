import express from 'express'; 

const feedbacksRouter = express.Router(); 

    feedbacksRouter.get('/feedbacks', (req, res)=> {
        res.send('feedback router')
    })


export default feedbacksRouter;