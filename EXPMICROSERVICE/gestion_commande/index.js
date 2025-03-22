const express=require('express')
const app=express()
const PORT=4001
const cors=require('cors')
const mongoose=require("mongoose")
const Commande=require('./Commande.js')
const axios=require('axios')
const isLogged = require('./middleware.js')
app.use(express.json())
app.use(cors())

mongoose.set('strictQuery',true)
mongoose.connect("mongodb://mongo:27017/commande-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT,()=>{
    console.log('server is on')
})
function PrixTotal(produits,commande){
    let total = produits.reduce((s, pr) => {
        const cmd = commande.find(cmd => cmd._id == pr._id);
        if (cmd) {
          return s + pr.price * cmd.quantity;
        }
        return s;
      }, 0);
      return total
}
async function httpRequests(commande,token){
    try{
        const URL='http://products:4000/acheter'
        const res=await axios.post(URL,{"ids":commande.map(pr=>(pr._id))},{
            headers:{'Content-Type':'application/json',
                "Authorization":token

            }
        })
        return PrixTotal(res.data,commande)

    }
    catch(err){
        console.log(err)
    }

}
app.post("/ajouter",isLogged,async(req,res,next)=>{
    const {produits}=req.body
    const total =await httpRequests(produits,req.headers['authorization'])
        const newCmd=new Commande({
        produits,
        email_utilisateur:req.user.email,
        prix_total:total
    })
    await newCmd.save()
    res.status(201).json(newCmd)

    
    
})
app.get("/list/:id?",isLogged,(req,res,next)=>{
   Commande.find(req.params.id?{_id:req.params.id}:{})
        .then(cmd=>res.status(200).json(cmd))
        .catch(err=>res.status(400).json({err}))
   })
app.delete("/todelete/:id?",isLogged,(req,res,next)=>{
    Commande.deleteMany(req.params.id?{_id:req.params.id}:{})
         .then(cmd=>res.status(200).json(cmd))
         .catch(err=>res.status(400).json({err}))
    })
 