import React from 'react'
import './ArticleCard.css'
import { Link } from 'react-router-dom'

export default function ArticleCard(props) {
    const articleLink = `/article/${props.id}`
    const articleText = `${props.text}`
    // const nowWords = []

    // function shortenText(string, nowWords) {
    function truncate(str, no_words) {
        return str.split(' ').splice(0, no_words).join(' ')
    }

    const shortenArticleText = truncate(articleText, 44)

    // console.log(articleText)

    return (
        <div className="article-card-container">
            <Link to={articleLink} className="article-card-wrapper">
                <div className="article-banner-preview">
                    <img src={props.url} alt="" />
                </div>
                <div className="article-infos-container">
                    <h2 className="article-title">Journal d’un apprenti dev # 1 : présentation</h2>
                    <div className="article-preview-wrapper">
                        <p className="article-preview">{shortenArticleText} [...]</p>
                    </div>
                    <div className="article-meta-wrapper">
                        <div className="article-date little-text-bold">
                            {new Date(props.date.seconds * 1000).toDateString()}
                        </div>
                        <div className="article-tags-container">
                            <div className="tag-wrapper little-text-italic-bold">development</div>
                            <div className="tag-wrapper little-text-italic-bold">learning</div>
                            <div className="tag-wrapper little-text-italic-bold">story</div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="divider-line"></div>
        </div>
    )
}
