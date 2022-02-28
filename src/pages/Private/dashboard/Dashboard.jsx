import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase.config'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [articles, setArticles] = useState([])
    const articlesCollectionRef = collection(db, 'articles')
    // const editArticleLink = `/edit-article/${article.id}`

    const navigate = useNavigate()

    useEffect(() => {
        const getArticles = async () => {
            const data = await getDocs(articlesCollectionRef)
            setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getArticles()
    }, [])

    const deleteDocHandler = async (articleId) => {
        await deleteDoc(doc(db, 'articles', articleId))
        console.log('article deleted')
        location.reload()
    }

    const editDocHandler = async (articleId) => {
        navigate(`/private/edit-article/${articleId}`)
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="articles-list-container">
                <div className="articles-list">
                    {articles.map((article) => {
                        return (
                            <div key={article.id} className="article-link-wrapper">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                                <div className="article-buttons-container">
                                    <button
                                        className="delete-article-button"
                                        onClick={() => {
                                            deleteDocHandler(article.id)
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
