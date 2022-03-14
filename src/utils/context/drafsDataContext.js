import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.config'

export const DraftsDataContext = createContext()

export function DraftsDataProvider(props) {
    const [drafts, setDrafts] = useState([])
    const docRef = collection(db, 'drafts')
    const [loadingData, setLoadingData] = useState(true)

    const fetchData = async () => {
        try {
            const data = await getDocs(docRef)

            setDrafts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoadingData(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()

        return drafts
    }, [])

    return (
        <DraftsDataContext.Provider value={drafts}>
            {!loadingData && props.children}
        </DraftsDataContext.Provider>
    )
}
