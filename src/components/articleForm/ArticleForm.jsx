import React from 'react'

import './ArticleForm.css'

import MarkdownEditor from '../markdownEditor/MarkdownEditor'

export default function ArticleForm(props) {
    const draftCollectionStyle = {
        backgroundColor: '#9E2B25',
        color: '#F9FCEF',
        padding: '4px',
        borderRadius: '5px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const publishedCollectionStyle = {
        backgroundColor: '#4F774D',
        color: '#F9FCEF',
        padding: '4px',
        borderRadius: '5px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

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
                                props.setFormValuesChanged(true)
                            }}
                            value={props.title}></input>
                    )}

                    <MarkdownEditor
                        setArticleText={props.setArticleText}
                        articleText={props.articleText}
                        setFormValuesChanged={props.setFormValuesChanged}
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
                        {props.isNewArticle == true ? (
                            <>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        props.setIsFormSubmitted(true)
                                        props.setIsGoingToDraft(false)
                                    }}>
                                    Publish
                                </button>
                                <div className="save-article-container">
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault()
                                            props.setIsFormSubmitted(true)
                                            props.setIsGoingToDraft(true)
                                        }}>
                                        Save
                                    </button>
                                    <p className="little-text-bold">as</p>
                                    <p style={draftCollectionStyle} className="little-text-bold">
                                        Draft
                                    </p>
                                </div>
                            </>
                        ) : props.isDraft == true ? (
                            <>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        props.setIsFormSubmitted(true)
                                        props.setIsGoingToDraft(false)
                                        props.setIsChangingCollection(true)
                                    }}>
                                    Publish
                                </button>
                                <div className="save-article-container">
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault()
                                            props.setIsFormSubmitted(true)
                                            props.setIsGoingToDraft(true)
                                            props.setIsChangingCollection(false)
                                        }}>
                                        Save
                                    </button>
                                    <p className="little-text-bold">as</p>
                                    <p style={draftCollectionStyle} className="little-text-bold">
                                        Draft
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="save-article-container">
                                <button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        props.setIsFormSubmitted(true)
                                        props.setIsGoingToDraft(false)
                                        props.setIsChangingCollection(false)
                                    }}>
                                    Save
                                </button>
                                <p className="little-text-bold">as</p>
                                <p style={publishedCollectionStyle} className="little-text-bold">
                                    Published
                                </p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}
