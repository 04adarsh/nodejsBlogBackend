const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt');
const { default: mongoose } = require('mongoose');


//Register
router.post('/register',async (req,res)=>{


    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt)

    try{
        let newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            profilePic:req.body.profilePic
        });
        const user= await newUser.save()
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)

    }
})

//Login

router.post('/login',async (req,res)=>{
    try{
        const user= await User.findOne({username:req.body.username})

        if(!user){
           return res.status(400).json("invalid credentials")
        }
        let flag= await bcrypt.compare(req.body.password,user.password);

        if(flag){
           return res.status(200).json(user)
        }else{
           return res.status(400).json("invalid credentials")
        }
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports= router

