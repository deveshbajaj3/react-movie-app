import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'

import Forminput from './Forminput';

function Register() {
    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const inputs = [
        {
            name : "userName",
            type: "text",
            placeholder: "Enter username",
            errorMessage: "Username should be 3 to 14 character",
            label : "User-Name",
            pattern:"^[A-Za-z]{3,16}$"
        },
        {
            name : "email",
            type: "email",
            placeholder: "Enter email",
            errorMessage: "Email should be required",
            label : "Email"
        },
        {
            name : "password",
            type: "text",
            placeholder: "Enter password",
            errorMessage: "Password length 8 char",
            pattern:"^[A-Za-z]{8}$",
            label : "Password"
        },
        {
            name : "confirmPassword",
            type: "text",
            placeholder: "Confirm password",
            pattern: values.password,
            errorMessage: "Password not matched",
            label : "Confirm Password"
        },
    ]
    // const userName = useRef()
    // const email = useRef()
    // const password = useRef()
    const [status, setSatus] = useState(false)
    const token = localStorage.getItem('token')
    const handleSubmit = () => {
        if (values && values.email && values.password) {
            let userData = {userName: values.userName, password: values.password, email :values.email}
            localStorage.setItem('userName', values.userName.trim())
            localStorage.setItem('password', values.password.trim())
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.removeItem('favMovieList')
            alert("Successfully Registered")
            setSatus(true);
        } else {
            alert("All fields are required!")
        }
    }
    const handleOnchange = (e,key) =>{
        setValues(()=>{
            return {...values, [e.target.name]:e.target.value}
        })
        console.log(values)
    }
    useEffect(() => {
        if (token) {
            setSatus(true)
        }
    }, [])
    return (
        <div className='app'>
            {status && <Navigate to="/login/" />}
            <h1 className='headingLabel'>Sign Up</h1>
            <h2>If you are already registered click here
                <a href="/login" className='sign'> Sign in</a>
            </h2>
            <form onSubmit={() => handleSubmit()}>
                {
                    inputs.map((input,i)=>
                        <Forminput key={i} value={values[input.name]} {...input} onChange={(e)=>handleOnchange(e)}/>
                    )
                }
                <button  type='submit' className="buttonSign">Sign Up</button>
            </form>
        </div>
    )
}

export default Register