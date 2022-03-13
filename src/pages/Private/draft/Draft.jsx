import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import './Draft.css'
import ReactMarkdown from 'react-markdown'
import '../../../utils/style/github-markdown-light.css'
import { DraftsDataContext } from '../../../utils/context/drafsDataContext'

export default function Article() {
    const { articleId } = useParams('')
    const [articleData, setArticleData] = useState({})
    const [articleDateString, setArticleDateString] = useState('')
    const drafts = useContext(DraftsDataContext)

    useEffect(async () => {
        const article = await drafts.find(function (post) {
            if (post.id == articleId) return true
        })
        setArticleDateString(new Date(article.articleDate.seconds * 1000).toDateString())
        setArticleData(article)
    }, [])

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
            </div>
        </div>
    )
}
