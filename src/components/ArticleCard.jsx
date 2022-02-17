import React from 'react'
import '../utils/style/ArticleCard.css'

export default function ArticleCard(props) {
    return (
        <div className="article-card-container">
            <div className="article-infos-container">
                <h3>{props.title}</h3>
            </div>
        </div>
    )
}
