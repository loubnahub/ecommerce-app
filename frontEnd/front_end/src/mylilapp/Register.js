import React, { useState,useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');

    const navigate=useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/');
        }
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nom,
          mot_passe: password,
        }),
      });

     
        const data = await response.json();
        if(response.status==200){
          navigate('/Login');      

}
      else{
           alert(data.error)
        }
    }
   
  

  return (
    <div className="form-style container-fluid d-flex justify-content-center flex-column align-items-center w-100" 
            style={{ height: "80vh"}}>
              <div className='container-style'>
          <h2 className='text-center text-white mb-3'>Register</h2>
          <form onSubmit={handleLogin}>
          <div className="form-group">
        <label className='text-warning'>Full Name</label>
         <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Enter your name"
            required
          /></div>
            <div className="form-group">
            <label className='text-warning'>Email</label>

              <input
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
            <label className='text-warning'>Password</label>

              <input
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className='linking'><button type="submit" className="login-button btn btn-warning mx-5 mt-4">
              Sign up
            </button>
            <Link to='/Login' className='text-white'>Your already have an account?</Link>
            </div>
          </form>
          </div>
        </div>
   
  );
};

export default Register;
