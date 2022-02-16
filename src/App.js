import Home from './pages/home/Home'
import Login from './pages/login/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBarDev from './components/NavBarDev'
import Private from './pages/Private/Private'
import Dashboard from './pages/Private/dashboard/Dashboard'
import WriteArticle from './pages/Private/write-article/WriteArticle'
import Article from './pages/article/Article'

export default function app(props) {
  console.log('App component as launched yeahh')
  return (
    <>
      <NavBarDev loginAdminPath={props.loginAdminPath} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/article" element={<Article />}></Route>

        <Route path={props.loginAdminPath} element={<Login />}></Route>
        <Route path="/private" element={<Private />}>
          <Route path="/private/dashboard" element={<Dashboard />}></Route>
          <Route path="write-article" element={<WriteArticle />}></Route>
        </Route>
      </Routes>
    </>
  )
}
