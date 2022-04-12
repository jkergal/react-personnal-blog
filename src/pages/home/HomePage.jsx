import './HomePage.css'
import React, { useContext } from 'react'
import ArticleCard from '../../components/articleCard/ArticleCard'
import { FirestoreDataContext } from '../../utils/context/firestoreDataContext'

function Home() {
    const { publicArticles } = useContext(FirestoreDataContext)

    return (
        <div className="articles-container">
            <div className="articles-grid">
                {publicArticles.map((article) => {
                    return (
                        <div key={article.id}>
                            <ArticleCard
                                id={article.id}
                                title={article.title}
                                text={article.articleText}
                                url={article.bannerUrl}
                                author={article.author}
                                date={article.articleDate}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
