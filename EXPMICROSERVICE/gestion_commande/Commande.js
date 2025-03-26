const mongoose = require("mongoose")
const CommandeSchema=mongoose.Schema({
    produits: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    email_utilisateur:String,
    prix_total:Number,
    created_at:{
        type:Date,
        default:Date.now()
    },
    status:String
   

})
module.exports=Commande=mongoose.model("commande",CommandeSchema)