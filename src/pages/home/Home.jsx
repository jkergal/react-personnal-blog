import './Home.css'
import React, { useContext } from 'react'
import ArticleCard from '../../components/ArticleCard'
import { FirestoreDataContext } from '../../utils/context/firestoreDataContext'

function Home() {
    const { publicArticles } = useContext(FirestoreDataContext)
    // console.log(publicArticles[0].articleText)

    return (
        <div className="home">
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
        </div>
    )
}

export default Home
