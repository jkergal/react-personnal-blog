import { createContext, useContext } from 'react'
import usePublicArticlesData from '../hooks/usePublicArticlesData'

const PublicArticlesDataContext = createContext()

export const usePublicArticlesDataContext = () => {
    const publicArticles = useContext(PublicArticlesDataContext)

    return publicArticles
}

export const PublicArticlesProvider = ({ children }) => {
    const publicArticles = usePublicArticlesData()

    return publicArticles ? (
        <PublicArticlesDataContext.Provider value={publicArticles}>
            {children}
        </PublicArticlesDataContext.Provider>
    ) : (
        <h1>Loading...</h1>
    )
}
