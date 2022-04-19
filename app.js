import express from "express"
const app=express()
import dotenv from "dotenv"
import bodyparser from "body-parser"
import path from "path"
import cors from "cors"
import {connectDb} from "./config/bdd.js"
import {router} from "./routers/post.js"
import {routerUser} from "./routers/user.js"

dotenv.config({path:"./config/config.env"})

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

connectDb()

app.use(cors())
app.use('/post',router)
app.use('/users',routerUser)
app.listen(process.env.PORT || 4000)