import React from 'react'
import './Template.css'

export default function Template(props) {
    return (
        <div className="page-grid">
            <div className="header-box">{props.Header}</div>

            <div className="content-box">{props.Page}</div>

            <div className="blogger-card-box">{props.BloggerCard}</div>
        </div>
    )
}
