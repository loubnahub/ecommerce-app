import logo from './logo.svg';
import './App.css';
import Products from './mylilapp/Products.js'
import Commandes from './mylilapp/Commandes.js'
import Login from './mylilapp/Login.js'
import Navbar from './mylilapp/Navbar.js'
import Home from './mylilapp/Home.js'
import UpdateForm from './mylilapp/UpdateForm.js'
import Register from './mylilapp/Register.js'
import {Route,Routes,BrowserRouter,Link} from 'react-router-dom'
import FormProd from './mylilapp/newProd.js';
function App() {
  return <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/Products' element={<Products/>}/>
  <Route path='/Commandes' element={<Commandes/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='/Register' element={<Register/>}/>
  <Route path='/NewProd' element={<FormProd/>}/>
  <Route path='/Update/:id' element={<UpdateForm/>}/>

    </Routes>




  </BrowserRouter>
}

export default App;
