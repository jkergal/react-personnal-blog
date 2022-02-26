import React, { useState, useEffect } from 'react'

export default function MarkdownEditor({ setArticleText, articleText }) {
    const [highlightedText, setHighlightedText] = useState('')

    useEffect(() => {
        const saveSelection = () => {
            setHighlightedText(window.getSelection().toString())
        }
        document.addEventListener('mouseup', saveSelection)
        return () => document.removeEventListener('mouseup', saveSelection)
    }, [])

    const markdownHandle = () => {
        let selectedText = highlightedText
        let markdownH2 = '## '
        setArticleText(articleText.replace(highlightedText, markdownH2.concat(selectedText)))
    }

    return (
        <div className="text-input">
            <div className="editing-tool-bar">
                <button type="button">B</button>
                <button type="button">i</button>
                <button type="button" onClick={markdownHandle}>
                    h2
                </button>
                <button type="button">h3</button>
                <button type="button">h4</button>
                <button type="button">code</button>
                <button type="button">strong</button>
                <button type="button">quote</button>
                <button type="button">link</button>
            </div>
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
        </div>
    )
}
