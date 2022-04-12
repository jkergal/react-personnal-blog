import React, { useContext, useEffect } from 'react'
import './Login.css'
import LoginForm from '../../components/loginForm/LoginForm'
import { UserContext } from '../../utils/context/userContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            navigate('/private/dashboard')
        }
    }, [])

    return (
        <div>
            <h1>LOGIN</h1>

            <LoginForm />
        </div>
    )
}
