import React, { useState } from 'react'
import './SignUp.css'
import Joi from 'joi'
import $ from 'jquery';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    let redirectTo = useNavigate()
   const [recive, setRecive] = useState(true)
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        age: 0,
        email: "",
        password: ""
    })
    const [errMsg, setErrMsg] = useState({})
    const [errors, setErrors] = useState([])
    function saveUserInfo(e) {

        user[e.currentTarget.name] = e.currentTarget.value;

    }
    function submitForm(e) {
        e.preventDefault();
        validate()
        //when make submit this meaning that disabled will removed .. so no error .. so make sign up 
    }



    function validate() {
        const schema = Joi.object({
            first_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            last_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({
                    "string.pattern.base":
                        `Password is required 
                        password must contain at least eight characters 
                        at least one number 
                        and both lower and uppercase letters 
                        and special characters`

                })
            ,
            // password: Joi.string()
            //     .pattern(new RegExp(
            //         '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
            //     )    )
            //     .messages({
            //         "string.pattern.base":  
            //             `Password is required 
            //             password must contain at least eight characters 
            //             at least one number 
            //             and both lower and uppercase letters 
            //             and special characters`

            //     })
            //     ,
            // password: Joi.string()
            //     .pattern(new RegExp(
            //         '/(?=^.{8,}$)(?=.*[@$!%*#?&\.\-_,:;\'"{}><\^()=+\/\])((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/gm'
            //     )    )
            //     .messages({
            //         "string.pattern.base":  
            //             `Password is required 
            //             password must contain at least eight characters 
            //             at least one number 
            //             and both lower and uppercase letters 
            //             and special characters`

            //     })
            //     ,
            age: Joi.number()
                .integer()
                .min(18)
                .max(100),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });
        //console.log(schema.validate(user, { abortEarly: false }))
        //console.log(user)
        let { error, value } = schema.validate(user, { abortEarly: false });
        if (error !== undefined) {
            $('#err').removeClass('d-none')
            setErrors(error.details)
        }
        else {
            setUser(user)
            $('#err').addClass('d-none')
            setErrors([])
            signUp()
        }
        //console.log(value)
        // add class is-valid or is-invalid
    }
    async function signUp() {
        setRecive(false)
        let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);
     console.log(data)   
     setRecive(true)
     if(data.message=="success"){
        setErrMsg({})
        $('#errMsg').addClass('d-none')
        redirectTo('/signin')
//redirect to login
        }
        else if(data.errors!==undefined){
            setErrMsg(data.errors)
            $('#errMsg').removeClass('d-none')
        }
    }

    return (
        <>
            <div className="container w-75">
                <p className="alert alert-danger d-none" id="err">
                    {errors != null ? errors.map((err) => {
                        return err.message
                    }) : ""}
                </p>
                <p className="alert text-center alert-danger d-none" id='errMsg' >
                    { console.log(Object.keys(errMsg).length)}
                    {
                     (Object.keys(errMsg).length !== 0) ? (errMsg.email.message) : ""
                    }
                </p>
                <form onSubmit={(e) => { submitForm(e) }}>
                    <div className='d-flex'>
                        <div className="mb-3 w-100">
                            <input onChange={(e) => { saveUserInfo(e) }} type="text" name="first_name" className="form-control" placeholder="Enter first name" />
                            {/*<p className="alert alert-danger">first  name err</p>*/}
                        </div>
                        <div className="mb-3  w-100 ms-2  ">
                            <input onChange={(e) => { saveUserInfo(e) }} type="text" name="last_name" className="form-control" placeholder="Enter last name" />
                            {/*<p className="alert alert-danger">last  name err</p>*/}
                        </div>
                    </div>
                    <div className="mb-3">
                        <input onChange={(e) => { saveUserInfo(e) }} type="email" name="email" className="form-control" placeholder="Enter Your Email" />
                        {/*<p className="alert alert-danger">email err</p>*/}
                    </div>
                    <div className="mb-3">
                        <input onChange={(e) => { saveUserInfo(e) }} type="text" name="age" className="form-control" placeholder="Enter Your Age" />
                        {/*<p className="alert alert-danger">age err</p>*/}
                    </div>
                    <div className="mb-3">
                        <input onChange={(e) => { saveUserInfo(e) }} type="password" name="password" className="form-control" placeholder="Enter Password" />
                        {/*<p className="alert alert-danger">Password is required<br />
                            password must contain at least eight characters<br />
                            at least one number<br />
                            and both lower and uppercase letters<br />
                            and special characters</p>*/}
                    </div>
                    <div className="mb-3">
                        <button type="submit" id="signup" className="form-control border-0 text-white bg-gray btn">{recive?"Sign Up":"waiting..."}</button> 
                    </div>
                </form>
            </div>
        </>
    )
}
