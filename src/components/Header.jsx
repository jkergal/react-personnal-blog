import React from 'react'
import '../utils/style/Header.css'

export default function Header(props) {
    return (
        <div className="header">
            <h1>{props.pageTitle}</h1>
        </div>
    )
}
