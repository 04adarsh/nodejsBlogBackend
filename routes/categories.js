const router=require('express').Router()
const Category=require('../models/Category')
const { default: mongoose } = require('mongoose');


router.post('/',async (req,res)=>{
    try{
       let newCategory= new Category({
            name:req.body.name,
       })
       const category=await newCategory.save()
       if(category){
        return res.status(200).json(category)
       }
    }catch(err){
        console.log(err)
        res.status(400).json({message: "category not created"})
    }
})

router.get('/:id',async(req,res)=>{
    try{

        const category=await Category.findById(req.params.id);
        if(category)
            return res.status(200).json(category)

    }catch(err){
        console.log(err)
        res.status(400).json({message:"category not found"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).json("category content cannot be empty")
        }
        const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(category){
            return res.status(200).json(category)
        }
    }catch(err){
        console.log(err)
        res.status(400).json({message:"cannot update product with id"+req.params.id})
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const category= await Category.findByIdAndRemove(req.params.id)

        if(!category){
          return  res.status(400).json("category not found with id"+req.params.id)
        }
        return res.status(200).json("category deleted successfully")
    }catch(err){
        console.log(err)
    }
})

module.exports=router