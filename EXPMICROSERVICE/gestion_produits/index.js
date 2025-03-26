const express=require('express')
const app=express()
const PORT=4000
const mongoose=require("mongoose")
const isLogged=require('./middleware.js')
const Produit=require('./Produit.js')
app.use(express.json())
mongoose.set('strictQuery',true)
mongoose.connect("mongodb://mongo:27017/produit-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT,()=>{
    console.log('server is on')
})
app.post("/ajouter",isLogged,(req,res,next)=>{
    const {label,description,price,quantity}=req.body
    const newProduit=new Produit({
        label,
        description,
        price,
        quantity
    })
    newProduit.save()
    .then(prod=>res.status(200).json(prod)).catch(err=>res.status(400).json({err}))
})
app.delete("/delete/:id",isLogged,(req,res,next)=>{
    const {id}=req.params
    Produit.deleteOne({_id:id})
    .then(()=>res.status(200).json({message:'ok'})).catch(err=>res.status(400).json({err}))
})
app.post("/acheter",isLogged,(req,res,next)=>{
    const {ids}=req.body
    Produit.find({_id:{$in:ids}})
    .then(prod=>res.status(200).json(prod))
    .catch(err=>res.status(400).json({err}))
})
app.patch("/modify/:id",isLogged,async (req,res)=>{
    const {label,description,price,quantity}=req.body
    const {id}=req.params
     Produit.updateOne({_id:id},{$set:{label,description,price,quantity}}).
    then(()=>res.status(200).json({message:'updated successfuly'}))
    .catch(err=>res.status(400).json({err}))

})
app.get("/list/:id?",isLogged,async (req,res,next)=>{
    const {id}=req.params
     Produit.find(id?{_id:id}:{})
        .then(prod=>res.status(200).json(prod))
        .catch(err=>res.status(400).json({err}))
   })
app.get("/produit",async (req,res,next)=>{
    const {id}=req.params
     Produit.find(id?{_id:id}:{})
        .then(prod=>res.status(200).json(prod))
        .catch(err=>res.status(400).json({err}))
   })