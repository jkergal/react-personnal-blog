import './Home.css'
import React, { useContext } from 'react'
import ArticleCard from '../../components/ArticleCard'
import { FirestoreDataContext } from '../../utils/context/firestoreDataContext'
import Header from '../../components/Header'

function Home() {
    const { publicArticles } = useContext(FirestoreDataContext)

    return (
        <div className="home">
            <Header pageTitle="Latest articles" />
            <div className="articles-container">
                <div className="articles-grid">
                    {publicArticles.map((article) => {
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
