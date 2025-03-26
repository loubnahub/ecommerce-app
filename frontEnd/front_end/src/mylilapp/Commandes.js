import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Commandes=()=>{
    const [commandes,setCommandes]=useState([])
    const[produits,setProduits]=useState([])
    const navigate=useNavigate()
    const token=localStorage.getItem('authToken')
    function cancelOrder(id){
                axios.delete(`/commande/todelete/${id}`,{
                    
                        headers:{
                            "Authorization":`Bearer ${token}`

                        }
                    
                }).then(() => {
                    setCommandes(commandes.filter(cmd => cmd._id !== id))
                })
            }
    async function fetchData() {
                const res1=await axios.get('/commande/list',{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            setCommandes(res1.data)
            const productIds = [...new Set(res1.data.flatMap(cmd => cmd.produits.map(prod => prod._id)))];
            const res=await axios.post('/produits/acheter',{"ids":productIds},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            setProduits(res.data)
            }

    useEffect(()=>{
        if (!token) {
            navigate('/Login');
        }
       
        fetchData()
        const interval = setInterval(fetchData, 5000); 

        return () => clearInterval(interval);
    },[]) 
    
   function changeColor(status){
    switch(status){
        case 'Received':return <span style={{color:'red'}}>Received</span>
        case 'Processing':return <span style={{color:'yellow'}}>Processing</span>
        case 'Shipped':return <span style={{color:'green'}}>Shipped</span>
        case 'Delivered':return <span style={{color:'#1F51FF'}}>Delivered</span>
        default:return <span style={{color:'pink'}}>Waiting ...</span>


    }
   }
    
    return <div className=" mt-4"><h2 className='w-100 text-center'>Your Orders</h2>
    {commandes.length?
           <table className='table my-5 w-100  table-striped table-dark'>
        <thead >
        <tr>
            <th>Product code</th>
            <th>Quantity</th>

            <th>total commande</th>

            <th>action</th>
            <th>status</th>

        </tr>
       </thead>
        <tbody>
    {commandes.map(cmd=><tr>
        <td colSpan={2}><table className='w-100 mx-3 '>{cmd.produits.map(prod=>
            {
                const product = produits.find(pr => pr._id === prod._id);

                return<tr>
            <td className='p-2'>{product?product.label:'not found'}<br/>
            <span className='tiny-text2'>{product?product.description:'not found'}</span></td><td><b>{prod.quantity}</b>/<span className='tiny-text2'>{product?product.price:0} DH</span></td> </tr>
            })}</table></td>
        <td>{cmd.prix_total} DH</td>
        <td><button className='btn btn-danger button' onClick={()=>cancelOrder(cmd._id)}>cancel Order</button></td>
            <td>{changeColor(cmd.status)}</td>
    </tr>)}</tbody>
    </table>:<p className='text-center text-muted'>no orders were put down yet ...</p>}</div>
}
export default Commandes