import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';

function Login() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [status, setSatus] = useState(false)
    const handleSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (userNameRef.current.value && passwordRef.current.value) {
            if (user && (userNameRef.current.value === user.userName) && user.password === passwordRef.current.value) {
                let token = userNameRef.current.value + passwordRef.current.value;
                localStorage.setItem('token', token)
                setSatus(true);
                alert("Successfully Loggedin")
            } else {
                alert("Credential not match!")
            }
        } else {
            alert("Credential not match!")
        }
    }
    return (
        <div>
            {status && <Navigate to="/" />}
            <h1 className='headingLabel'>Log In</h1>
            <form>
                <div className='input_space'>
                    <input ref={userNameRef} type="text" placeholder='Enter Username' name="username" required />
                    <br></br>
                </div>
                <div className='input_space'>
                    <input ref={passwordRef} type="password" placeholder='Enter password' name="password" required />
                    <br></br>
                </div>
            </form>
            <button onClick={() => handleSubmit()} className="buttonSign">Sign In</button>
            <p>Not a member? <a href="/register">Sign up</a></p>
        </div>
    )
}

export default Login