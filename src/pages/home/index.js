import React from 'react'
import Template from '../../components/template/Template'
import Header from '../../components/header/Header'
import BloggerCard from '../../components/bloggerCard/BloggerCard'
import Home from './HomePage'

export default function index() {
    return (
        <Template
            Header={<Header pageTitle="Latest articles" />}
            headerHeight="100px"
            BloggerCard={<BloggerCard />}
            Page={<Home />}
        />
    )
}
