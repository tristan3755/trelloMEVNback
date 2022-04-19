import mongoose from 'mongoose';

const postSchema=mongoose.Schema({
title:{
    type:String,
    required:true,
},
text:{
    type:String,
    required:true,
},
status:{
    type:String,
    required:true,
},
id_user:{
    type:String,
    required:true,
}
},{timestamps:true})

export const exportSchema=mongoose.model('posts',postSchema)