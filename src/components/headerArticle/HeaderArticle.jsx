import React from 'react'
import './HeaderArticle.css'

export default function Header(props) {
    return (
        <div className="header-article">
            <div className="h1-wrapper">
                <h1>{props.pageTitle}</h1>
            </div>
        </div>
    )
}
