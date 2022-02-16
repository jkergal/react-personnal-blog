import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase.config'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'

export default function ArticleForm() {
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const articlesCollectionRef = collection(db, 'articles')
    // let navigate = useNavigate()
    const [validation, setValidation] = useState('')

    // const [isSubmitSuccessful, setIsSubmitSuccessful] = useState()
    // const { reset } = useForm()

    // useEffect(() => {
    //     reset({})
    // })

    // const inputs = useRef([])
    // const addInputs = (el) => {
    //     inputs.current.push(el)
    // }

    const postArticle = async (e) => {
        e.preventDefault()
        try {
            await addDoc(articlesCollectionRef, { title, articleText })
            setValidation('Article sucessfully posted')
            console.log('Articled seccessfully posted')
            // setIsSubmitSuccessful(true)
            setTitle('')
            setArticleText('')
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
                        }}
                        value={title}></input>

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
                        }}
                        value={articleText}></textarea>
                    <p className="validation-login-form">{validation}</p>

                    <button onClick={postArticle}>Post</button>
                </form>
            </div>
        </>
    )
}
