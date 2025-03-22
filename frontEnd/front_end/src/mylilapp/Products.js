 import {useEffect,useState} from 'react'
 import Product from './product.js'
 import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 const Products =()=>{
    const [list,setList]=useState([])
    const [cmd,setCmd]=useState([])
    const navigate=useNavigate()
    const token =localStorage.getItem("authToken")
   async function DeleteProduct (id) {
   
          await axios.delete(`/produits/delete/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
    });
          setList(list.filter(product => product._id !== id));
        }   
 function sendOrder(){
        axios.post('/commande/ajouter',{
            produits:cmd
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(()=>navigate('/Commandes'))
        
    }
    useEffect(()=>{
 
        if (!token) {
      navigate('/Login')
    }
    fetch('/produits/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>res.json()).then(data=>setList(data))
    
},[])
    return (
        <div className='d-flex container w-100 flex-column justify-content-center'>
            <div className='d-flex justify-content-center'>
                <button className=' mx-5 my-2 w-50 btn btn-success' onClick={()=>{navigate('/NewProd')}}>add new product</button>
            <button className=' mx-5 my-2 w-50 btn btn-secondary' onClick={()=>{navigate('/Commandes')}}>Check orders</button> </div>
            {list&&list.length?<div className='d-flex flex-wrap justify-content-center '>
                {list.map((prod,index)=><Product key={index} DeleteProduct={DeleteProduct} cmd={cmd} setCmd={setCmd} data={prod}/>)}</div>:<p style={{height:"75vh"}} className='text-center d-flex align-items-center justify-content-center text-muted p-2 '>No product was created still ...</p>}
           
            <div className='container w-100 d-flex justify-content-center'>{cmd.length>0&&<div className='w-50 text-center'>
               <fieldset className='border border-warning p-4 m-3 rounded'> <legend><h2>Commande</h2></legend>
                {cmd.map(one=><><div className='d-flex justify-content-between'><div>
                    <span className='fs-6'>{list.find(prod=>prod._id==one._id).label} </span>
               </div><div>{one.quantity} Units</div></div><div className='d-flex justify-content-center'><hr className='w-50'/></div></>)}
                <button onClick={sendOrder} className='btn btn-warning'>sendOrder</button>
          </fieldset>   </div>}</div>
           
            </div>
    )
}
export default Products