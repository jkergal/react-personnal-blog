import React from 'react'
import Template from '../../../components/template/Template'
import Header from '../../../components/header/Header'
import BloggerCard from '../../../components/bloggerCard/BloggerCard'
import WriteArticle from './WriteArticle'

export default function index() {
    return (
        <Template
            Header={<Header pageTitle="Write an article" />}
            headerHeight="100px"
            BloggerCard={<BloggerCard />}
            Page={<WriteArticle />}
        />
    )
}
