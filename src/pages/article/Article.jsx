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
    const [firebaseTimestamp, setFirebaseTimestamp] = useState({})
    // const [convertedTimestamp, setConvertedTimestamp] = useState('')

    const docRef = doc(db, 'articles', `${articleId}`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef)

                console.log('response firebase', docSnap)

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

    useEffect(() => {
        setFirebaseTimestamp(articleData.articleDate)
        console.log('setDate')
    }, [articleData])

    useEffect(() => {
        console.log(firebaseTimestamp.toDate())
        // setConvertedTimestamp(
        //     new Date(firebaseTimestamp.seconds * 1000).toLocaleDateString('en-US')
        // )
        // console.log('converted date : ' + convertedTimestamp)
    }, [firebaseTimestamp])

    return (
        <div>
            <img src={articleData.bannerUrl}></img>
            <h1>{articleData.title}</h1>
            {/* {date.map((dateItem) => (
                <div key="nanoseconds">{dateItem.nanoseconds}</div>
            ))} */}
            {/* <h3>{date}</h3> */}
            {/* {articleData.map((articleDate) => {
                ;<h3 key={articleData.id}>
                    {new Date(item.articleDate.seconds * 1000).toLocaleDateString('en-US')}
                </h3>
            })} */}
            <p className="article-text">{articleData.articleText}</p>
        </div>
    )
}
