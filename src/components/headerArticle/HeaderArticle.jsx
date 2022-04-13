import React from 'react'
import './HeaderArticle.css'

export default function Header(props) {
    return (
        <div className="header-article">
            <h1>{props.pageTitle}</h1>
        </div>
    )
}
