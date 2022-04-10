import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'
import { UserContext } from '../utils/context/userContext'
import '../utils/style/Navbar.css'
import logo from '../assets/images/logo-jk.svg'
import homeIcon from '../assets/icons/home.svg'
import emailIcon from '../assets/icons/email.svg'
import writeIcon from '../assets/icons/write.svg'
import settingsIcon from '../assets/icons/settings.svg'
import logOutIcon from '../assets/icons/logout.svg'

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
        <>
            <div className="logo-blog-wrapper">
                <img src={logo} alt="logo" className="logo-blog"></img>
            </div>
            <div className="navbar-wrapper">
                <nav>
                    <div className="logo-wrapper">
                        <Link to="/">
                            <img src={homeIcon} alt="Home icon navbar" className="navbar-logo" />
                        </Link>
                    </div>
                    <div className="logo-wrapper">
                        <Link to="/">
                            <img src={emailIcon} alt="Email icon navbar" className="navbar-logo" />
                        </Link>
                    </div>
                    <div className="logo-wrapper">
                        <Link to="/private/write-article">
                            <img src={writeIcon} alt="Write icon navbar" className="navbar-logo" />
                        </Link>
                    </div>
                    <div className="logo-wrapper">
                        <Link to="/private/dashboard">
                            <img
                                src={settingsIcon}
                                alt="Settings icon navbar"
                                className="navbar-logo"
                            />
                        </Link>
                    </div>
                    <div className="logo-wrapper">
                        <a href="#" onClick={logOut}>
                            <img
                                src={logOutIcon}
                                alt="Log out icon navbar"
                                className="navbar-logo"
                            />
                        </a>
                    </div>
                </nav>
            </div>
        </>
    )
}
