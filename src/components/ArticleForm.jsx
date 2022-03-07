import React from 'react'

import '../utils/style/ArticleForm.css'

import MarkdownEditor from './MarkdownEditor'

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

                    <button onClick={props.articleSubmitHandler}>{props.submittingType}</button>
                </form>
            </div>
        </>
    )
}
