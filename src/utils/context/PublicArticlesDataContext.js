import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.config'

export const PublicArticlesDataContext = createContext()

export function PublicArticlesDataProvider(props) {
    const [publicArticles, setPublicArticles] = useState([])
    const docRef = collection(db, 'articles')
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(docRef)

                setPublicArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                setLoadingData(false)
                console.log('response firebase', data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()

        return publicArticles
    }, [])

    useEffect(() => {
        console.log('public articles :')
        console.log(publicArticles)
    }, [publicArticles])

    return (
        <PublicArticlesDataContext.Provider value={publicArticles}>
            {!loadingData && props.children}
        </PublicArticlesDataContext.Provider>
    )
}
