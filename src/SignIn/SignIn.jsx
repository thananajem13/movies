import axios from 'axios'
import Joi from 'joi'
import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usrToken } from '../ContextContent/ContextContent';
import './SignIn.css'


export default function SignIn() {
    let redirectTo = useNavigate()
    const { token, setToken, setUserId, userId } = useContext(usrToken);

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [errSignIn, setErrSignIn] = useState("")
    const [errMsg, setErrMsg] = useState([])
    const [recive, setRecive] = useState(true)
    function saveProps(e) {
        user[e.currentTarget.name] = e.currentTarget.value;
        setUser(user)
        console.log(user)
    }
    function submitForm(e) {
        e.preventDefault()
        validateSignIn()
    }
    function validateSignIn() {
        let schema = Joi.object({
            email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().required()
        })
        let res = schema.validate(user, { abortEarly: false })
        if (res.error !== undefined) {
            setErrMsg(res.error.details)
        }
        else {
            setErrMsg([])
            setUser(user)
            signInWithApi()
        }
        // console.log(res.value) 
    }
    async function signInWithApi() {
        setRecive(false)
        let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", user)
        console.log(data)
        setRecive(true)
        if (data.message === "success") {
            //take token and put it in localstorage
            localStorage.setItem("userToken", data.token)
            console.log(data.token)
            setToken(data.token)
            console.log(data.token) 
            if (data.token.length !== 0) {
                console.log(token)
                setUserId(jwtDecode(data.token)._id)
                localStorage.setItem("userID", jwtDecode(data.token)._id)

                console.log(userId)
            }

            localStorage.setItem("userID", userId)
            redirectTo('/')
        }
        else {
            setErrSignIn(data.message)
            setToken("")
        }
    }
    return (
        <>
            <div className="container w-50">
                <p className="alert alert-danger d-none" id="errMsg">
                    {
                        errMsg.length !== 0 ?
                            errMsg.map((err) => {
                                return err.message
                            }) : ""
                    }
                </p>
                <p className="alert alert-danger d-none" id="errSignIn">
                    {
                        errSignIn.length !== 0 ? errSignIn.message : ""

                    }
                </p>
                <form onSubmit={(e) => { submitForm(e) }}>
                    <div className="mb-3">
                        <input type="email" onChange={(e) => { saveProps(e) }} name="email" className="form-control" placeholder="Enter Your email" />
                        {/*<p className="alert alert-danger">first  name err</p>*/}
                    </div>
                    <div className="mb-3">
                        <input type="password" onChange={(e) => { saveProps(e) }} name="password" className="form-control" placeholder="Enter Your password" />
                        {/*<p className="alert alert-danger">last  name err</p>*/}
                    </div>

                    <div className="mb-3">
                        <button type="submit" id="signin" className="form-control border-0 text-white bg-gray btn w-25">{recive ? "Sign In" : "waiting..."}</button>
                    </div>
                </form>
            </div>

        </>
    )
}
