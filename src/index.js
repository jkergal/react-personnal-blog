import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './utils/context/userContext'
import { PublicArticlesDataProvider } from './utils/context/publicArticlesDataContext'
import { DraftsDataProvider } from './utils/context/drafsDataContext'

const LoginAdminPath = '/login/id:' + process.env.REACT_APP_ADMIN_LOGIN_PATH_ID
console.log('index.js as launched yes')
ReactDOM.render(
    <Router>
        <UserContextProvider>
            <PublicArticlesDataProvider>
                <DraftsDataProvider>
                    <App loginAdminPath={LoginAdminPath} />
                </DraftsDataProvider>
            </PublicArticlesDataProvider>
        </UserContextProvider>
    </Router>,
    document.getElementById('root')
)
