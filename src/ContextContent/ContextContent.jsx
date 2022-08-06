import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import './ContextContent.css'
import jwtDecode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
export let usrToken = createContext('')
export default function ContextContent(props) {
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [userId, setUserId] = useState("")
    useEffect(() => { 
        getRes() 
    }, []); 
        function getRes(){
            if (localStorage.getItem("userToken") !== null) {
                // alert(localStorage.getItem("userToken"))
            // console.log(token)
            // console.log(jwtDecode(token))
            // setUserId(jwtDecode(token)._id) 
           setId(jwtDecode(token)._id)  
            localStorage.setItem("userID",jwtDecode(token)._id)
            console.log(jwtDecode(token))
            console.log(jwtDecode(token)._id)
            console.log(localStorage.getItem("userID"))
            // console.log(userId)
        }
        else { setId("")  }
        }
       
    // }, [token,userId]); 
    function setId(id) {
        setUserId(id)
    }
    return (

        <usrToken.Provider value={ {token, setToken, userId,setUserId }}>

            {
            //  (localStorage.getItem("userToken") !== null) ?
            props.children
            // :<Navigate to="/signin" replace /> 
            
            }
        </usrToken.Provider>
    )
}
