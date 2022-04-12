import React from 'react'

import './ArticleForm.css'

import MarkdownEditor from '../markdownEditor/MarkdownEditor'

export default function ArticleForm(props) {
    return (
        <>
            <div className="article-form-container">
                <form className="article-form">
                    {props.isEditionMode ? (
                        <h2>{props.title}</h2>
                    ) : (
                        <input
                            className="article-title-input"
                            type="text"
                            placeholder="Enter article title"
                            name="title"
                            required
                            onChange={(event) => {
                                event.preventDefault()
                                props.setTitle(event.target.value)
                            }}
                            value={props.title}></input>
                    )}
                    <MarkdownEditor
                        setArticleText={props.setArticleText}
                        articleText={props.articleText}
                    />
                    <label htmlFor="bannerFile">
                        <b>{props.bannerUploadingLabel}</b>
                    </label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="choose-file-handler"
                        onChange={props.chooseFileHandler}></input>
                    <p className="upload-progress">Uploading done {props.progress}%</p>
                    <p className="validation-login-form">{props.validation}</p>
                    <div className="buttons-container">
                        {props.isEditionMode ? (
                            <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    props.setIsDraft(false)
                                }}>
                                Post
                            </button>
                        ) : (
                            <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    props.setIsDraft(false)
                                }}>
                                Post
                            </button>
                        )}
                        {props.articleDataIsDraft == true ||
                        props.articleDataIsDraft == undefined ? (
                            <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    props.setIsDraft(true)
                                }}>
                                Save as draft
                            </button>
                        ) : null}
                    </div>
                </form>
            </div>
        </>
    )
}
