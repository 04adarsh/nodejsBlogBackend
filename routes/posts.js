const router=require('express').Router()
const Post=require('../models/Post')
const { default: mongoose } = require('mongoose');

router.post('/create', async (req, res) => {
    // Create a new post object

    const post=await Post.findOne({title:req.body.title})

    if(post){
       return res.status(500).json({message:"post title already exists"})
    }
    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
      username:req.body.username,
      categories:req.body.categories
    });
  
    // Save the new post to the database
    newPost.save((err, post) => {
      if (err) return res.status(500).send(err);
     return res.status(200).send(post);
    });
  });

  router.get('/',async (req,res)=>{

    try{
        
       const posts= await Post.find({});

       if(!posts){
        return res.status(404).json("no post to display")
       }

       res.status(200).json(posts)
    }catch(err){
        console.log(err)
      return  res.status(500).json({message:"cannot fetch product list"})
    }
 
  })


  module.exports=router