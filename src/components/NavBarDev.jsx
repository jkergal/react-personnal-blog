import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'
import { UserContext } from '../utils/context/userContext'

export default function NavBarDev() {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch {
            alert(
                "For some reasons we can't deconnect, please check your internet connexion and retry."
            )
        }
    }

    if (!currentUser) {
        return null
    }

    return (
        <div>
            <nav>
                <Link to="/">Home / </Link>
                <Link to="/private/dashboard">Dashboard / </Link>
                <Link to="/private/write-article">Write Article / </Link>
                <button onClick={logOut}>LOG OUT</button>
            </nav>
        </div>
    )
}
