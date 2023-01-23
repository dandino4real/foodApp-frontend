import React from 'react'
import Logo from '../../assets/logo.svg'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../../context/authcontext'

const Navbar = () => {
  const {Logout}=useAuth()
  const getSignature = localStorage.getItem("signature")
  const handleLogout=()=>{
    Logout()
  }

  return (
    <nav >
        <div class="logo-container">
            <img src={Logo} alt="logo" />
            <h3>Food Review Blog</h3>
        </div>
        <ul>
            <li className='active'> <Link to="/" className='link'>Home</Link></li>
            {/* <li><Link to="/restaurant " className='link'>Restaurants</Link></li> */}
            {
              !getSignature?(
                <>
                <li><Link to="/login" className='link'>Login</Link></li>
            <li><Link to="/signup" className='link'>Signup</Link></li>
                </>
              ):(<>
              <li><Link to="#" className='link' onClick={handleLogout}>Logout</Link></li>
           
              </>)
            }
            
        </ul>
    </nav>
   
  )
}

export default Navbar