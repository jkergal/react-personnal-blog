import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase.config'
// import { useNavigate } from 'react-router-dom'

export default function ArticleForm() {
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const articlesCollectionRef = collection(db, 'articles')
    // let navigate = useNavigate()
    const [validation, setValidation] = useState('')
    const postArticle = async (e) => {
        e.preventDefault()
        try {
            await addDoc(articlesCollectionRef, { title, articleText })
            setValidation('Article sucessfully posted')
            // navigate('/')
        } catch (err) {
            console.log(err)
            setValidation('Wopsy, there was an error posting the article')
        }
    }

    return (
        <>
            <div className="article-form-container">
                <form className="article-form">
                    <label className="article-title-label" htmlFor="articleTitle">
                        <b>Title :</b>
                    </label>
                    <input
                        className="articleTitleInput"
                        type="text"
                        placeholder="Enter article title"
                        name="title"
                        required
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}></input>

                    <label className="article-content-label" htmlFor="articleContent">
                        <b>Grab your pencil :</b>
                    </label>
                    <textarea
                        className="article-content-input"
                        name="articleContent"
                        rows="50"
                        cols="50"
                        placeholder="Here is my best blog article..."
                        onChange={(event) => {
                            setArticleText(event.target.value)
                        }}></textarea>
                    <p className="validation-login-form">{validation}</p>

                    <button value="Submit" onClick={postArticle}>
                        Post
                    </button>
                </form>
            </div>
        </>
    )
}
