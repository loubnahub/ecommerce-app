import axios from 'axios'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Product=({data,cmd,setCmd,DeleteProduct})=>{
  const navigate=useNavigate()
  const token=localStorage.getItem('authToken')
  const [bool,setBool]=useState(false)
  const [prod,setProd]=useState({
    _id:data._id
  })
  function validate(e){
    e.preventDefault()
    setCmd([...cmd,prod])
    setBool(false)
  }
  async function deleting (id){
    const response=await DeleteProduct(id)
  }
   return  <div className="card bg-c w-25 m-1 ">
                <div className="card-block">
                    <h5>{data.label}</h5>
                    <h4 className="d-flex justify-content-between"><button className='btn border border-warning' onClick={()=>setBool(true)}><i className="fa text-warning fa-cart-plus"></i></button><span> {data.quantity||<span className='text-danger'>0</span>}<span className='fs-6 fw-light text-muted'> pieces</span> </span></h4>
                    <p className="d-flex justify-content-between"><p className='tiny-text'>{data.description}</p><p className='px-2'>{data.price} DH <b className="fw-light tiny-text text-muted">/ unit</b></p></p>
                    <button className='btn btn-danger m-1'onClick={()=>(deleting(data._id))}>Delete</button>
                  <button className='btn btn-primary m-1'onClick={()=>{navigate(`/Update/${data._id}`)}}>update</button>
                </div>
                {bool&&<form className='d-flex m-2 justify-content-evenly'onSubmit={validate}>
                <div className="input-group">
                <input type='number' 
                className="form-control form-control-sm border border-warning w-50"
                placeholder='insert quantity...'
                min="1" 
                max="100" 
                  onChange={(e)=>(setProd({...prod,quantity:e.target.value}))} />
                <button type='submit' 
                  className="btn btn-warning btn-sm" >add to card</button>
                  </div>
                  </form>}
            </div>
 

}
export default Product