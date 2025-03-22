const jwt=require('jsonwebtoken')
const isLoggedIn=async (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
// const token =await req.headers['authorization']?.replace("Bearer ","");   
    jwt.verify(token,'secret_key',(err,user)=>{
        if(err){
       return res.status(401).json(token)
    }
    req.user=user
    next()
    })

}
module.exports=isLoggedIn