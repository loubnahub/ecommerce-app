const express=require('express')
const app=express()
const PORT = 4002
const mongoose=require('mongoose')
const Utilisateur=require('./utilisateurs.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
mongoose.set('strictQuery',true)
mongoose.connect("mongodb://localhost:27017/auth-service")
app.use(express.json())
app.listen(PORT,()=>{
    console.log('connected hun')
})

app.post("/auth/register",async(req,res)=>{
    let {nom,email,mot_passe}=req.body
    const userExists=await Utilisateur.findOne({email})
    if(userExists){
        return res.json({message:"cet utilisateur existe deja"})

    }
    else{
        mot_passe=await bcrypt.hash(mot_passe,10)
        const newUtilisateur=new Utilisateur({
            nom,
            email,
            mot_passe 
        })
        newUtilisateur.save().then(user=>res.status(200).json(user)).catch(user=>res.status(404).send('no no'))
    }
})
app.post('/auth/login',async(req,res,next)=>{
    const {email,mot_passe}=req.body
    const user = await Utilisateur.findOne({email})
    if (!user)
        {return res.status(401).json({error:"user not found"})}
        bcrypt.compare(mot_passe,user.mot_passe).then(valid=>{
            if(!valid){
            return res.status(401).json({error:"password incorrect"}) 
        }
        const token=jwt.sign({nom:user.nom,email:user.email},'secret_key',{expiresIn:'120s'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 10 * 60 * 1000
        });
        
        return res.redirect('/home')
})})

const isLoggedIn=(req,res,next)=>{
 const token=req.headers.cookie&&req.headers.cookie.split('=')[1]
    jwt.verify(token,'secret_key',(err,user)=>{
        if(err){
       return res.send('omg wtf')
    }
    req.user=user
    next()
    })

}
app.get('/home',isLoggedIn,(req,res,next)=>{
        return res.send('welcome home '+req.user.email)
    })
app.get('/auth/logout', (_, res) => {
        res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });

    res.json({ message: "Déconnexion réussie" });
});
