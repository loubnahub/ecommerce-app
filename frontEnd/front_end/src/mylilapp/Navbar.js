import {Link,useLocation} from 'react-router-dom'
export default function (){
      const location=useLocation()
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        
        window.location.href = '/Login'; 
      };
      if (location.pathname === '/Login' || location.pathname === '/Register') {
        return null;  
      }    
    return (        
           
            <div className=" d-flex align-items-center justify-content-around p-2 bg-dark text-light w-100"> 
              <Link  to="/" className="navbar-logo ">
              MyApp
            </Link>
              
              <div className="navbar-item">
                <Link to="/Products" style={{color:"white" }}>Products</Link>
              </div>
              <div className="navbar-item">
                <Link to="/Commandes" style={{color:"white"}}>Commandes</Link>
              </div>
              <div className="navbar-item">
                <button className='btn btn-warning' onClick={handleLogout}>Logout</button>

              </div>
            </div>
     )
}