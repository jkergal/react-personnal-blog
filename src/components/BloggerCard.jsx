import React from 'react'
import PhotoJk from '../assets/images/photo-jk.png'
import '../utils/style/BloggerCard.css'

export default function BloggerCard() {
    return (
        <div className="blogger-card-wrapper">
            <img src={PhotoJk} alt="Blogger Photo" className="blogger-photo" />
        </div>
    )
}
