import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import alertContext from '../context/alert/alertContext'

const Signup = () => {

    const alerts = useContext(alertContext)

    const history = useHistory()

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpass: "" })

    const { name, email, password, cpass } = credentials

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()

        if (password !== cpass) {
            json.status = false
        }

        if (json.status === true) {
            history.push('/')
        }
        // else if(password !== cpass && json.status === true){
        //     alert('Password Mismatch!!')
        // }
        else {
            alerts.showAlert('danger', 'User Already exists / password mismatch')
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2>Signup To Use I-Notebook </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="Email" aria-describedby="emailHelp" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="Password" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPass" className="form-label">Confirm Password</label>
                    <input type="password" name="cpass" className="form-control" id="cPass" onChange={handleChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
