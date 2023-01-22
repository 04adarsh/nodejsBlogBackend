const express = require('express');
const router = express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const { default: mongoose } = require('mongoose');

let hashPassword="";

router.put('/:id',async(req,res)=>{
    try{
        if(req.body.password){
            const salt= await bcrypt.genSalt(10);
    hashPassword=await bcrypt.hash(req.body.password,salt)
        }
      User.findById(req.params.id,(err,user)=>{
        if(err) return res.status(500).json(err)
        if(!user) return res.status(404).json("user not found")

        user.username=req.body.username
        user.email=req.body.email
        user.password=hashPassword,
        user.profilePic=req.body.profilePic

        user.save((err,updatedUser)=>{
            if (err) return res.status(500).send(err);
            res.status(200).json(updatedUser)
        })
      })
    }catch(err){
        console.log(err)
        res.status(500).json("user not updated something went wrong")
    }
})

router.get('/:id', async (req,res)=>{

    try{
        const user= await User.findById(req.params.id);
        if(user){
           const {password,...others}=user_doc
        return res.status(200).send(others)
        }
    }catch(err){
        res.status(500).json({message:`user not found with id ${req.params.id}`})
    }
  
})


module.exports=router



