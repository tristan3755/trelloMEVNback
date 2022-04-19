import express from "express";
export const routerUser=express.Router()
import {exportSchemaUsers} from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


routerUser.post('/inscription',(req,res)=>{
bcrypt.hash(req.body.password,2)
.then(hash=>{
    const users=new exportSchemaUsers({
        username:req.body.username,
        password:hash,
    })
    users.save((err,userSave)=>{
        if(!err){
            res.send(userSave)
        }else{
            res.status(500).json({code:500,message:'problème',utilisateurAjoutéEchec:err})
        }
    })
}).catch(err=>{
    res.send(err).status(500)
})
})

routerUser.post('/connexion',(req,res)=>{
    exportSchemaUsers.findOne({username:req.body.username})
    .then(user=>{
        if(!user){
           return res.status(401).json({code:401,message:"identifiants erronés"})
        }
        bcrypt.compare(req.body.password,user.password)
        .then(passwordOk=>{
            if(!passwordOk){
                return res.status(401).json({code:401,message:"password erronée"})
            }
            res.status(200).json({code:200,userId:user._id,token:jwt.sign({userId:user._id},process.env.secretToken,{expiresIn:"24h"})})
        })
    })
   
})