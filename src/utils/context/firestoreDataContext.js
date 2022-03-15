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
            console.log('context public worked')
        } catch (err) {
            console.error(err)
        }
    }

    const fetchDrafts = async () => {
        try {
            const data = await getDocs(draftDocRef)

            setDrafts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log('context draft worked')
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(async () => {
        await fetchPublicArticles()

        console.log('useEffect context public & draft worked')
        return publicArticles
    }, [])

    useEffect(async () => {
        await fetchDrafts()
        setLoadingData(false)
        console.log('useEffect context  draft worked')
        return drafts
    }, [publicArticles])

    return (
        <FirestoreDataContext.Provider
            value={{ publicArticles, drafts, fetchPublicArticles, fetchDrafts }}>
            {!loadingData && props.children}
        </FirestoreDataContext.Provider>
    )
}
