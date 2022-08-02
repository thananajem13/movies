import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { usrToken } from '../ContextContent/ContextContent';
import './Navbar.css'
export default function Navbar() {
  const {token,setToken,setUserId,userId} = useContext(usrToken);
  async function logout(){
    setToken("")
    localStorage.removeItem("userToken")
    localStorage.removeItem("userID")
    setUserId("")
    let res = await axios.post('https://route-egypt-api.herokuapp.com/signOut',{token})
    console.log(res)
    //signout api steps
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-transparent">
  <div className="container">
    <Link className="navbar-brand text-white" to="/"><i className="fa-solid fa-note-sticky"></i>Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         
        
        <li className="nav-item dropdown">
        { 
          (token!==null&&token.length!==0)?<Link  to="/"  className="nav-link dropdown-toggle text-white"   role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Logout
          </Link>
          :
          <Link  to="/signin"   className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
          </Link>}
           
          

          <ul className="dropdown-menu"> 
            {
               
            (token!==null&&token.length!==0)?
            <li><Link to="/"  className="dropdown-item " onClick={logout}  id="signOut"  >logout</Link></li>:
            <>
            <li><Link to="signup" className="dropdown-item " id='register'  >Sign Up</Link></li>
            <li><Link  className="dropdown-item " to="signin" id='login' >Sign In</Link></li> 
            </>
            }
            
             
          </ul>
        </li>
         
      </ul>
       
    </div>
  </div>
</nav>
    </>
  )
}
