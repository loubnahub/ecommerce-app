const express=require('express')
const app=express()
const PORT = 4002
const mongoose=require('mongoose')
const isLoggedIn=require('./middleware.js')
const Utilisateur=require('./utilisateurs.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const cors=require('cors')
mongoose.set('strictQuery',true)
mongoose.connect("mongodb://mongo:27017/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json())
app.use(cors());
app.listen(PORT,()=>{
    console.log('connected hun')
})

app.post("/register",async(req,res)=>{
  
    let {nom,email,mot_passe}=req.body
    const userExists=await Utilisateur.findOne({email})
    if(userExists){
        return res.status(400).json({error:"cet utilisateur existe deja"})

    }
    else{
        mot_passe=await bcrypt.hash(mot_passe,10)
        const newUtilisateur=new Utilisateur({
            nom,
            email,
            mot_passe 
        })
        newUtilisateur.save().then(user=>res.status(200).json(user)).catch(()=>res.status(404).json({error:'an issue accured'}))
    }
})
app.post('/login',async(req,res,next)=>{
    const {email,mot_passe}=req.body
    const user = await Utilisateur.findOne({email})
    if (!user)
        {return res.status(401).json({error:"user not found"})}
        bcrypt.compare(mot_passe,user.mot_passe).then(valid=>{
            if(!valid){
            return res.status(401).json({error:"password incorrect"}) 
        }
        jwt.sign({nom:user.nom,email:user.email},'secret_key',(_,token)=>{
                     return res.status(200).json(token)

        })
     
})})

app.post('/home',isLoggedIn,(req,res,next)=>{
    return res.status(200).json({ message: 'Token is valid', user: req.user });
    })
app.post('/logout', (req, res) => {
        res.clearCookie('authToken');
        res.json({ message: 'Logged out successfully' });
      });
