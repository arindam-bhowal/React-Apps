import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Login = () => {

    let history = useHistory()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authTokken)
            history.push('/')
        }
        else {
            alert('Invalid credentials')
        }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 style={{color: 'red'}} className="mb-3">Login To Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} name="email" className="form-control" id="Email" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} name="password" className="form-control" id="Password" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}

export default Login;
