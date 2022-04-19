import express from "express";
export const router=express.Router()
import {exportSchema} from "../models/post.js"
import {authentification} from '../middlewares/auth.js'

router.post('/add',authentification,(req,res)=>{

    const newPost=new exportSchema({
        title:req.body.title,
        text:req.body.text,
        status:req.body.status,
        id_user:req.body.id_user,
    })
    newPost.save().then(newPostSave=>{
        if(!newPostSave){
            res.status(401).json({code:401,message:'error'})
        }else{
            res.send(newPostSave)
        }
    }).catch(err=>{
        res.send(err).status(500)
    })

})
router.get('/find/:id_user',(req,res)=>{
    exportSchema.find({id_user:req.params.id_user})
    .then(postFind=>{
        if(!postFind){
            res.status(401).json({code:'401',message:'introuvable'})
        }else{
            res.send(postFind)
        }
}).catch((err)=>{
    res.send(err).status(500)
})
})
router.put('/modif/:title',authentification,(req,res)=>{
let postModif=({
    title:req.body.title,
    text:req.body.text,
})
exportSchema.findOneAndUpdate({title:req.params.title},{$set:postModif},{new:true})
.then(postModifSelect=>{
    if(!postModifSelect){
res.status(401).json({code:'401',message:'introuvable'})
    }else{
res.send(postModifSelect)
    }
}).catch((err)=>{
    res.send(err).status(500)
})
})
router.delete('/supp/:_id',authentification,(req,res)=>{
    exportSchema.findOneAndDelete({_id:req.params._id})
    .then(postDeleted=>{
        if(!postDeleted){
            res.status(401).json({code:'401',message:'introuvable'})
        }else{
            res.send(postDeleted)
        }
    }).catch((err)=>{
        res.send(err).status(500)
    })
})
router.put('/status/:_id',authentification,(req,res)=>{
    let postModifStatus=({
        status:req.body.status,
    })
    exportSchema.findOneAndUpdate({_id:req.params._id},{$set:postModifStatus},{new:true})
    .then(postModifStatusSelect=>{
        if(!postModifStatusSelect){
    res.status(401).json({code:'401',message:'introuvable'})
        }else{
    res.send(postModifStatusSelect)
        }
    }).catch((err)=>{
        res.send(err).status(500)
 })
})
