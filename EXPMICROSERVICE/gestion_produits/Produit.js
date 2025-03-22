const mongoose = require("mongoose")
const ProduitSchema=mongoose.Schema({
    label:String,
    description:String,
    price:Number,
    quantity:Number,
    created_at:{
        type:Date,
        default:Date.now()
    }

})
module.exports=Produit=mongoose.model("produit",ProduitSchema)