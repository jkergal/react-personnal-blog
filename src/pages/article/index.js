import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Template from '../../components/template/Template'
import HeaderArticle from '../../components/headerArticle/HeaderArticle'
import BloggerCard from '../../components/bloggerCard/BloggerCard'
import Article from './ArticlePage'
import { FirestoreDataContext } from '../../utils/context/firestoreDataContext'

export default function index() {
    const { articleId } = useParams('')
    const { publicArticles } = useContext(FirestoreDataContext)
    const [articleTitle, setArticleTitle] = useState({})

    useEffect(async () => {
        const article = await publicArticles.find(function (post) {
            if (post.id == articleId) return true
        })
        setArticleTitle(article)
    }, [])

    return (
        <Template
            Header={<HeaderArticle pageTitle={articleTitle.title} />}
            headerHeight="220px"
            BloggerCard={<BloggerCard />}
            Page={<Article articleId={articleId} publicArticles={publicArticles} />}
        />
    )
}
