const express=require('express')
const app=express()
const PORT=4001
const mongoose=require("mongoose")
const Commande=require('./Commande.js')
const axios=require('axios')
const isLogged = require('./middleware.js')
const amqp=require('amqplib')
app.use(express.json())

mongoose.set('strictQuery',true)
mongoose.connect("mongodb://mongo:27017/commande-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT,()=>{
    console.log('server is on')
})
async function placeOrder(order) {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();

        const queue = 'order_queue';
        await channel.assertQueue(queue, { durable: true });

        const orderData = JSON.stringify(order);

        channel.sendToQueue(queue, Buffer.from(orderData), { persistent: true });

    } catch (error) {
        console.error("Error sending message to RabbitMQ:", error);
    }
}


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
        prix_total:total,
        status:'Waiting ...'
    })
   const result = await newCmd.save()
    placeOrder(result)
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
app.post('/update-status', async (req, res) => {
        const { orderId, status } = req.body;
    
        try {
            const updatedOrder = await Commande.findByIdAndUpdate(orderId, { status }, { new: true });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update order status' });
        }
    });