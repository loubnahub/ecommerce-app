import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
export default function FormProd(){
    const [form,setForm]=useState({label:''})
    const navigate=useNavigate()
    const token =localStorage.getItem('authToken')
    const {id}=useParams()
    useEffect(()=>{
      if (!token) {
        navigate('/Login');
    }
        axios.get(`/produits/list/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response=>setForm(response.data[0]))},[id])
        
    async function validate(e){
        e.preventDefault()
        if (!token) {
          navigate('/Login');
      }
        const response=await axios.patch(`/produits/modify/${id}`, {
            label: form.label,
            description: form.description,
            price: form.price,
            quantity:form.quantity
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
            },
          });
          if(response.status==200)
            {
                navigate('/Products')
            }
            else{
                alert('failed'+response.status)
            }

    }
    return   <form className=' my-5 container w-25 d-flex flex-column justify-content-center' onSubmit={validate} method='POST'>
            <label>Label</label>
        <input value={form.label||''} onChange={(e)=>{setForm({...form,label:e.target.value})}}/>
      
        <label>Description</label>
        <input value={form.description||''} onChange={(e)=>{setForm({...form,description:e.target.value})}}/>
        <label>Prix</label>
        <input value={form.price||''} onChange={(e)=>{setForm({...form,price:e.target.value})}}/>
        <label>Quantity</label>
        <input value={form.quantity||''} required onChange={(e)=>{setForm({...form,quantity:e.target.value})}}/>
        <div className='d-flex justify-content-center'><button type='submit' className=' m-2 w-100 btn btn-primary'> update</button>
        <button className=' m-2 w-100 btn btn-secondary' onClick={()=>{navigate('/Products')}}> cancel</button></div>
        

          </form>
        
       
  
}