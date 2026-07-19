const mongoose=require("mongoose")



const blackListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true, "Token is required to be added"]
    }
},
   {
    timestamps:true
   }
)

const blackListTokenModel=mongoose.model("BlackListToken", blackListTokenSchema)

module.exports=blackListTokenModel
