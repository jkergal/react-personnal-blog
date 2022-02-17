import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase.config'

export default function ArticleForm() {
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const articlesCollectionRef = collection(db, 'articles')
    const [validation, setValidation] = useState('')

    // const [image, setImage] = useState(null)
    // const [progress, setProgress] = useState(0)

    const uploadBannerFile = (event) => {
        if (event.target.file[0]) {
            // setImage(e.target.files)
            console.log('prout')
        }
    }

    const handleUpload = () => {
        // const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // uploadTask.on(
        //     'state_changed',
        //     (snapshot) => {
        //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //         setProgress(progress)
        //     },
        //     (error) => {
        //         console.log(error)
        //     },
        //     () => {
        //         storage.ref('images').child(image.name).getDownloadURL()
        //     }
        // )
    }

    const postArticle = async (e) => {
        e.preventDefault()
        try {
            await addDoc(articlesCollectionRef, { title, articleText })
            setValidation('Article sucessfully posted')
            console.log('Articled seccessfully posted')
            setTitle('')
            setArticleText('')
            handleUpload()
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

                    <label htmlFor="bannerFile">
                        <b>Upload banner</b>
                    </label>
                    <input type="file" className="uploadButton" onChange={uploadBannerFile}></input>

                    {/* <progress value={progress} max="100" /> */}

                    <p className="validation-login-form">{validation}</p>

                    <button onClick={postArticle}>Post</button>
                </form>
            </div>
        </>
    )
}
