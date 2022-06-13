import React from 'react'
import Template from '../../../components/template/Template'
import Header from '../../../components/header/Header'
import BloggerCard from '../../../components/bloggerCard/BloggerCard'
import EditArticle from './EditArticle'

export default function index() {
    return (
        <Template
            Header={<Header pageTitle="Edit your article" />}
            headerHeight="100px"
            BloggerCard={<BloggerCard />}
            Page={<EditArticle />}
        />
    )
}
