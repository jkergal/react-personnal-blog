import './Home.css'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'
import React, { useEffect, useState } from 'react'
import ArticleCard from '../../components/ArticleCard'

function Home() {
    const [articlesList, setArticlesList] = useState([])
    const articlesCollectionRef = collection(db, 'articles')

    useEffect(() => {
        const getArticles = async () => {
            const data = await getDocs(articlesCollectionRef)
            console.log(
                data.docs.map((doc) => ({ author: 'Johann Kergal', ...doc.data(), id: doc.id }))
            )

            setArticlesList(
                data.docs.map((doc) => ({ author: 'Johann Kergal', ...doc.data(), id: doc.id }))
            )
        }
        getArticles()
    }, [])
    return (
        <div className="home">
            <h1>This is home of JK Blog.</h1>
            <div className="articles-container">
                <div className="articles-grid">
                    {articlesList.map((article) => {
                        return (
                            <div className="article-card" key={article.id}>
                                <ArticleCard
                                    id={article.id}
                                    title={article.title}
                                    text={article.text}
                                    url={article.bannerUrl}
                                    author={article.author}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
