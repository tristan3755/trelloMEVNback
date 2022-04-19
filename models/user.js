import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator"

const postUser=mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
},{timestamps:true})
postUser.plugin(uniqueValidator)

export const exportSchemaUsers=mongoose.model('users',postUser)