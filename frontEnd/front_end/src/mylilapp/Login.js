import React, { useState ,useEffect} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/');
        }
    }, []);

    

  const handleLogin = async (e) => {
    e.preventDefault();
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, 
          mot_passe: password,
        }),
      });

      
        const data = await response.json();
        localStorage.setItem('authToken', data);
        if(response.status==200){
                  navigate('/');      

        }
        else{
          alert(data.error)
        }
    
  };

  return (
    <div className="form-style container-fluid d-flex justify-content-center flex-column align-items-center w-100" 
        style={{ height: "80vh"}}>
          <div className='container-style'>
      <h2 className='text-center text-white mb-3'>Log in</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className='linking'><button type="submit" className="login-button btn btn-warning mx-5 mt-4">
          Login
        </button>
        <Link to='/Register' className='text-white'>Dont have an account yet?</Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
