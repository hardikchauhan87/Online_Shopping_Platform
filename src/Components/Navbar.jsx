import React, { useState } from 'react'
import { Badge, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Model from '../Model';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
  let data=useCart();
  
  const[cartView,setcartview]=useState(false)
  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  const handleHelp=()=>{
    navigate("/help")
  }
  return (
    <div>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="#">All-You-Need</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
      {
        (localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
        </li>

      :""}
      </ul>
      {
        (!localStorage.getItem("authToken"))?
     <div className='d-flex'>

          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
          </div> :

          <div>
            <div className='btn bg-white text-success mx-2' onClick={()=>{setcartview(true)}}>
            My Cart
            <Badge pill bg='danger'>{data.length}</Badge>
          </div>
{cartView?<Model onClose={()=>setcartview(false)}> <Cart/></Model>:null}

          <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
            Logout
          </div> 
          <div className='btn bg-white text-danger mx-2' onClick={handleHelp}>
            Help
          </div>
          </div> }
    </div>
    
  </div>
</nav>

    </div>
  )
}

export default Navbar