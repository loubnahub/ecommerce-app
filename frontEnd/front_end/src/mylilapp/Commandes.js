import {useState,useEffect} from 'react'
import axios from 'axios'
const Commandes=()=>{
    const [commandes,setCommandes]=useState([])
    const[produits,setProduits]=useState([])
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
    useEffect(()=>{
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
        fetchData()
    },[]) 
    
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
            <td className='text-warning '>waiting ...</td>
    </tr>)}</tbody>
    </table>:<p className='text-center text-muted'>no orders were put down yet ...</p>}</div>
}
export default Commandes