import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.config'

export const PublicArticlesDataContext = createContext()

export function PublicArticlesDataProvider(props) {
    const [publicArticles, setPublicArticles] = useState([])
    const docRef = collection(db, 'articles')
    const [loadingData, setLoadingData] = useState(true)
    // const [needingNewFetch, setNeedingNewFetch] = useState(true)

    const fetchData = async () => {
        // if (needingNewFetch == true) {
        try {
            const data = await getDocs(docRef)

            setPublicArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoadingData(false)
            console.log('context worked')
        } catch (err) {
            console.error(err)
        }
        // } else {
        //     return
        // }
    }

    useEffect(() => {
        fetchData()

        return publicArticles
    }, [])

    return (
        <PublicArticlesDataContext.Provider value={{ publicArticles, fetchData }}>
            {!loadingData && props.children}
        </PublicArticlesDataContext.Provider>
    )
}
