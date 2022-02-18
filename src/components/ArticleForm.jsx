import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function ArticleForm() {
    const [title, setTitle] = React.useState('')
    const [articleText, setArticleText] = useState('')

    const articlesCollectionRef = collection(db, 'articles')
    const [validation, setValidation] = useState('')

    const [image, setImage] = React.useState('')
    const [progress, setProgress] = useState(0)

    const uploadHandler = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
        console.log(e.target.files[0])
        // console.log('image state : ' + image)
    }

    const uploadFiles = (image) => {
        if (!image) return
        const sotrageRef = ref(storage, `banners/${image.name}`)
        const uploadTask = uploadBytesResumable(sotrageRef, image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(prog)
            },
            (error) => console.log('there is an error : ' + error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                })
            }
        )
    }

    const postArticle = async (e) => {
        e.preventDefault()
        try {
            await addDoc(articlesCollectionRef, { title, articleText })
            setValidation('Article successfully posted')
            console.log('Articled successfully posted')
            setTitle('')
            setArticleText('')
            // console.log(image)
            uploadFiles(image)
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
                    <input type="file" className="uploadButton" onChange={uploadHandler}></input>

                    <p className="upload-progress">Uploading done {progress}%</p>

                    <p className="validation-login-form">{validation}</p>

                    <button onClick={postArticle}>Post</button>
                </form>
            </div>
        </>
    )
}
