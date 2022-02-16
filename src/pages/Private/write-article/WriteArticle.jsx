import React from 'react'
import ArticleForm from '../../../components/ArticleForm'
import './WriteArticle.css'

export default function WriteArticle() {
    return (
        <div className="write-articles-page">
            <h1>Write an article</h1>
            <ArticleForm />
        </div>
    )
}
