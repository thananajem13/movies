import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

export default function AlreadySingned(props) {
    let redirect = useNavigate()
    console.log(props)
    console.log(localStorage.getItem("userID"))
  if (localStorage.getItem("userID") !== null) {
    return <Navigate to="/" replace />;  
  } 
  else { 
    let currentUrl = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
   let res =  currentUrl==="signin"?  <SignIn/> : <SignUp/>
     return res;   
  }
}


