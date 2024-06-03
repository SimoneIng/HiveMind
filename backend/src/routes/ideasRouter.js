import express from 'express'; 

const ideasRouter = express.Router(); 

    ideasRouter.get('/ideas', (req, res)=> {
        res.send('ideas router')
    })


export default ideasRouter;