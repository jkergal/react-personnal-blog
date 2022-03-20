import Home from './pages/home/Home'
import Login from './pages/login/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBarDev from './components/NavBarDev'
import Private from './pages/Private/Private'
import Dashboard from './pages/Private/dashboard/Dashboard'
import WriteArticle from './pages/Private/write-article/WriteArticle'
import Article from './pages/article/Article'
import Draft from './pages/Private/draft/Draft'
import EditArticle from './pages/Private/edit-article/EditArticle'

export default function app(props) {
    console.log('App component as launched yeahh')
    return (
        <>
            <div className="main-grid">
                <div className="navbar-container">
                    <NavBarDev className="navbar-container" />
                </div>

                <div className="content-container">
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route path="/article/:articleId" element={<Article />}></Route>

                        <Route path={props.loginAdminPath} element={<Login />}></Route>
                        <Route path="/private" element={<Private />}>
                            <Route path="/private/dashboard" element={<Dashboard />}></Route>
                            <Route path="/private/draft/:articleId" element={<Draft />}></Route>
                            <Route
                                path="/private/edit-article/:articleId"
                                element={<EditArticle />}></Route>
                            <Route path="/private/write-article" element={<WriteArticle />}></Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}
