import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Article() {
    const { articleId } = useParams('')
    // console.log(articleId)
    // const [loading, setLoading] = useState(true)
    const [articleData, setArticleData] = useState({})

    const docRef = doc(db, 'articles', `${articleId}`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef)

                console.log('response', docSnap)

                // let data = { title: 'not found' }

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data())
                }

                setArticleData(docSnap.data())
                console.log('state data : ' + articleData)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <img src={articleData.bannerUrl}></img>
            <h1>{articleData.title}</h1>
            <p>{articleData.articleText}</p>
        </div>
    )
}
