import { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
export default function(){
    const navigate=useNavigate()
     useEffect(() => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/Login');
            }
        }, []);
    return (
        <div className="home-page container">
          <h2 className='m-4'>Welcome Who Ever You Are 🖤</h2>
          <p>A humble interface for some sort of manager to manipulate the database of his company's products , and where he/she can pass<br/> orders automatically of the products they sell ,
            enjoy the mini trip with us 😉
          </p>
          <div className="home-buttons">
            <button className="home-button btn btn-dark m-2" onClick={()=>navigate('/Products')}>
          View Products
            </button>
            <button className="home-button btn btn-warning m-2"  onClick={()=>navigate('/Commandes')}>
             View Orders
            </button>
          </div>
        </div>
      );
}