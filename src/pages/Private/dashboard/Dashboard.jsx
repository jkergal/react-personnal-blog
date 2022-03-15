import React, { useContext } from 'react'
import { db } from '../../../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
// import { PublicArticlesDataContext } from '../../../utils/context/publicArticlesDataContext'
// import { DraftsDataContext } from '../../../utils/context/drafsDataContext'
import { FirestoreDataContext } from '../../../utils/context/firestoreDataContext'

export default function Dashboard() {
    const { publicArticles } = useContext(FirestoreDataContext)
    const { fetchPublicArticles } = useContext(FirestoreDataContext)
    const { fetchDrafts } = useContext(FirestoreDataContext)
    const { drafts } = useContext(FirestoreDataContext)

    const navigate = useNavigate()

    const deleteDocHandler = async (articleId, collection, fetchUpdate) => {
        await deleteDoc(doc(db, collection, articleId))
        console.log('article deleted')
        await fetchUpdate
        navigate(`/private/dashboard`)
    }

    const editDocHandler = async (articleId) => {
        navigate(`/private/edit-article/${articleId}`)
    }

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
                                    <button
                                        className="delete-article-button"
                                        onClick={() => {
                                            deleteDocHandler(
                                                article.id,
                                                'articles',
                                                fetchPublicArticles()
                                            )
                                        }}>
                                        DELETE
                                    </button>
                                    <button
                                        className="edit-article-button"
                                        onClick={() => {
                                            editDocHandler(article.id)
                                        }}>
                                        EDIT
                                    </button>
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
                                    <button
                                        className="delete-article-button"
                                        onClick={() => {
                                            deleteDocHandler(article.id, 'drafts', fetchDrafts())
                                        }}>
                                        DELETE
                                    </button>
                                    <button
                                        className="edit-article-button"
                                        onClick={() => {
                                            editDocHandler(article.id)
                                        }}>
                                        EDIT
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
