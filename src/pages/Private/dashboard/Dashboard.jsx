import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { FirestoreDataContext } from '../../../utils/context/firestoreDataContext'
import EditButton from '../../../components/editButton/EditButton'
import DeleteButton from '../../../components/deleteButton/DeleteButton'

export default function Dashboard() {
    const { publicArticles } = useContext(FirestoreDataContext)
    const { fetchPublicArticles } = useContext(FirestoreDataContext)
    const { fetchDrafts } = useContext(FirestoreDataContext)
    const { drafts } = useContext(FirestoreDataContext)

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            <div className="articles-list-container">
                <div className="articles-list">
                    <h3>Public Articles</h3>
                    {publicArticles.map((article) => {
                        return (
                            <div key={article.id} className="article-link-wrapper">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                                <div className="article-buttons-container">
                                    <DeleteButton
                                        articleId={article.id}
                                        collection="articles"
                                        fetchUpdate={fetchPublicArticles}
                                    />
                                    <EditButton
                                        articleId={article.id}
                                        publicArticles={publicArticles}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="articles-list-container">
                <div className="articles-list">
                    <h3>Drafts</h3>
                    {drafts.map((article) => {
                        return (
                            <div key={article.id} className="article-link-wrapper">
                                <Link to={`/private/draft/${article.id}`}>{article.title}</Link>
                                <div className="article-buttons-container">
                                    <DeleteButton
                                        articleId={article.id}
                                        collection="drafts"
                                        fetchUpdate={fetchDrafts}
                                    />
                                    <EditButton
                                        articleId={article.id}
                                        publicArticles={publicArticles}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
