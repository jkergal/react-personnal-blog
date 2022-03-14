import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import './Article.css'
import ReactMarkdown from 'react-markdown'
import '../../utils/style/github-markdown-light.css'
import { PublicArticlesDataContext } from '../../utils/context/publicArticlesDataContext'
import { doc, deleteDoc } from 'firebase/firestore'
import { UserContext } from '../../utils/context/userContext'
import { db } from '../../firebase.config'
import { useNavigate } from 'react-router-dom'

export default function Article() {
    const { articleId } = useParams('')
    const [articleData, setArticleData] = useState({})
    const [articleDateString, setArticleDateString] = useState('')
    const { publicArticles } = useContext(PublicArticlesDataContext)
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(async () => {
        const article = await publicArticles.find(function (post) {
            if (post.id == articleId) return true
        })
        setArticleDateString(new Date(article.articleDate.seconds * 1000).toDateString())
        setArticleData(article)
    }, [])

    const deleteDocHandler = async (articleId) => {
        await deleteDoc(doc(db, 'articles', articleId))
        console.log('article deleted')
        navigate(`/private/dashboard`)
    }

    const editDocHandler = async (articleId) => {
        navigate(`/private/edit-article/${articleId}`)
    }

    return (
        <div className="article-container">
            <div className="article-wrapper">
                <img src={articleData.bannerUrl}></img>
                <h1>{articleData.title}</h1>
                <h3>{articleDateString}</h3>
                <div className="article-paragraphs">
                    <div className="markdown-body">
                        <ReactMarkdown children={articleData.articleText} />
                    </div>
                </div>
                {currentUser ? (
                    <div className="article-buttons-container">
                        <button
                            className="delete-article-button"
                            onClick={() => {
                                deleteDocHandler(articleData.id)
                            }}>
                            DELETE
                        </button>
                        <button
                            className="edit-article-button"
                            onClick={() => {
                                editDocHandler(articleData.id)
                            }}>
                            EDIT
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
