import React from 'react'
import { useState, useEffect, useContext } from 'react'
import './ArticlePage.css'
import ReactMarkdown from 'react-markdown'
import '../../utils/style/github-markdown-light.css'
import { UserContext } from '../../utils/context/userContext'
import EditButton from '../../components/editButton/EditButton'
import DeleteButton from '../../components/deleteButton/DeleteButton'

export default function Article(props) {
    const publicArticles = props.publicArticles
    const articleId = props.articleId
    const [articleData, setArticleData] = useState({})
    const { currentUser } = useContext(UserContext)

    useEffect(async () => {
        const article = await publicArticles.find(function (post) {
            if (post.id == articleId) return true
        })
        setArticleData(article)
    }, [])

    return (
        <div className="article-container">
            <div className="article-wrapper">
                <div className="banner-wrapper">
                    <img src={articleData.bannerUrl} className="banner-article"></img>
                </div>

                <div className="article-paragraphs">
                    <div className="markdown-body">
                        <ReactMarkdown children={articleData.articleText} />
                    </div>
                </div>
                {currentUser ? (
                    <div className="article-buttons-container">
                        <DeleteButton articleId={articleId} collection="articles" />
                        <EditButton articleId={articleId} publicArticles={publicArticles} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
