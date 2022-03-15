import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './utils/context/userContext'
import { FirestoreDataProvider } from './utils/context/firestoreDataContext'

const LoginAdminPath = '/login/id:' + process.env.REACT_APP_ADMIN_LOGIN_PATH_ID
console.log('index.js as launched yes')
ReactDOM.render(
    <Router>
        <UserContextProvider>
            <FirestoreDataProvider>
                <App loginAdminPath={LoginAdminPath} />
            </FirestoreDataProvider>
        </UserContextProvider>
    </Router>,
    document.getElementById('root')
)
