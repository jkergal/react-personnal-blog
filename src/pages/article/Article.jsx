import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Article.css'
// import { map } from '@firebase/util'

export default function Article() {
    const { articleId } = useParams('')
    // console.log(articleId)
    // const [loading, setLoading] = useState(true)
    const [articleData, setArticleData] = useState({})
    // const [dateString, setDateString] = useState('')

    const docRef = doc(db, 'articles', `${articleId}`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef)

                console.log('response', docSnap)

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

    // useEffect(() => {
    //     setDateString(articleData.articleDate.getDay())
    // }, [articleData])

    return (
        <div>
            <img src={articleData.bannerUrl}></img>
            <h1>{articleData.title}</h1>
            {/* {articleData.articleDate.map((date) => (
                <div key="nanoseconds">{date.nanoseconds}</div>
            ))} */}
            {/* <h3>{articleData.articleDate}</h3> */}
            <p className="article-text">{articleData.articleText}</p>
        </div>
    )
}
