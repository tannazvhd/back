const express = require('express');
const router = express.Router();

//Get
router.get('/', (req,res)=>{
    res.render('index', {title:'Home Page'})
})

//Post
router.post('/', (req,res)=>{
    res.send('Post done')
})

module.exports=router;