import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function FormProd(){
    const [form,setForm]=useState({})
    const navigate=useNavigate()
    async function validate(e){
        e.preventDefault()
        const token = localStorage.getItem('authToken');
        if (!token) {
      return;
        }
        const response=await axios.post('/produits/ajouter', {
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
    return <form className=' my-5 container w-25 d-flex flex-column justify-content-center' onSubmit={validate} method='POST'>
    <label>Label</label>
<input  required onChange={(e)=>{setForm({...form,label:e.target.value})}}/>

<label>Description</label>
<input required onChange={(e)=>{setForm({...form,description:e.target.value})}}/>
<label>Prix</label>
<input  required onChange={(e)=>{setForm({...form,price:e.target.value})}}/>
<label>Quantity</label>
<input  required onChange={(e)=>{setForm({...form,quantity:e.target.value})}}/>
<div className='d-flex justify-content-center'><button type='submit' className=' m-2 w-100 btn btn-success'> create</button>
<button className=' m-2 w-100 btn btn-secondary' onClick={()=>{navigate('/Products')}}> cancel</button></div>


  </form>
}