import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    // let redirect = useNavigate()
    console.log(props)
    console.log(localStorage.getItem("userID"))
  if (localStorage.getItem("userID") !== null) {
    return props.children;  
  } else {
    // return <Navigate to="/" replace />;
    return <Navigate to="/signin" replace />;
    //  return <Navigate to="/signin" />;
    // redirect('/signin') 
  }
}


