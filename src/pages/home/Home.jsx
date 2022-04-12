import './Home.css'
import React, { useContext } from 'react'
import ArticleCard from '../../components/articleCard/ArticleCard'
import { FirestoreDataContext } from '../../utils/context/firestoreDataContext'
import Header from '../../components/header/Header'
import BloggerCard from '../../components/bloggerCard/BloggerCard'

function Home() {
    const { publicArticles } = useContext(FirestoreDataContext)

    return (
        <div className="home-grid">
            <div className="header-box">
                <Header pageTitle="Latest articles" />
            </div>

            <div className="content-box">
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

            <div className="blogger-card-box">
                <BloggerCard />
            </div>
        </div>
    )
}

export default Home
