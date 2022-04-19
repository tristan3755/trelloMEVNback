import jwt from "jsonwebtoken"

export const authentification=(req,res,next)=>{

    try{
        const token=req.headers.authorization.split(' ')[1]   
        const tokenDecode=jwt.verify(token,process.env.secretToken) 
        const userId=tokenDecode.userId
        if(req.body.userId&&req.body.userId==!userId){
            throw 'utilisateur inconnu'
        }else{
            next()
        }
}catch{
    res.status(401).json({
        error: new Error('requête invalide!')
    })
}
}