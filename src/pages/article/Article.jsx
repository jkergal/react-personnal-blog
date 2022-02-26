import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Article.css'
import ReactMarkdown from 'react-markdown'

export default function Article() {
    const { articleId } = useParams('')
    const [articleData, setArticleData] = useState({})
    const [articleDateString, setArticleDateString] = useState('')
    // const source = `**heading 1**`

    const docRef = doc(db, 'articles', `${articleId}`)

    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef)

                console.log('response firebase', docSnap)

                if (docSnap.exists() && mounted) {
                    console.log('docSnap.data()', docSnap.data())
                    setArticleData(docSnap.data())
                    setArticleDateString(
                        new Date(docSnap.data().articleDate.seconds * 1000).toDateString()
                    )
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
        return () => (mounted = false)
    }, [])

    return (
        <div className="article-container">
            <div className="article-wrapper">
                <img src={articleData.bannerUrl}></img>
                <h1>{articleData.title}</h1>
                <h3>{articleDateString}</h3>
                <ReactMarkdown children={articleData.articleText} />
            </div>
        </div>
    )
}
