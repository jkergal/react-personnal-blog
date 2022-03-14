import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.config'

export const FirestoreDataContext = createContext()

export function FirestoreDataProvider(props) {
    const [publicArticles, setPublicArticles] = useState([])
    const [drafts, setDrafts] = useState([])
    const publicDocRef = collection(db, 'articles')
    const draftDocRef = collection(db, 'drafts')
    const [loadingData, setLoadingData] = useState(true)

    const fetchPublicArticles = async () => {
        try {
            const data = await getDocs(publicDocRef)

            setPublicArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoadingData(false)
            console.log('context worked')
        } catch (err) {
            console.error(err)
        }
    }

    const fetchDrafts = async () => {
        try {
            const data = await getDocs(draftDocRef)

            setDrafts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoadingData(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDrafts()

        return drafts
    }, [])

    useEffect(() => {
        fetchPublicArticles()

        return publicArticles
    }, [])

    return (
        <FirestoreDataContext.Provider
            value={{ publicArticles, drafts, fetchPublicArticles, fetchDrafts }}>
            {!loadingData && props.children}
        </FirestoreDataContext.Provider>
    )
}
