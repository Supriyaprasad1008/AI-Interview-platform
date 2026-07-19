const jwt =require("jsonwebtoken")
const blackListTokenModel=require("../models/blacklist.model")

async function authMiddleware(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }
    const isTokenBalcklisted=await blackListTokenModel.findOne({token})
    if(isTokenBalcklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }    
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded
        next()

    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token."
        })
    }
}

module.exports={authMiddleware}