import React, { useState, useEffect } from 'react'

export default function MarkdownEditor({ setArticleText, articleText }) {
    const [highlightedText, setHighlightedText] = useState('')
    // const [isMounted, setIsmounted] = useState(false)

    // useEffect(() => {
    //     setIsmounted(true)
    // }, [])

    const selectedText = highlightedText
    const bold = `**${selectedText}**`
    const italic = `*${selectedText}*`
    const h2 = `## ${selectedText}`
    const h3 = `### ${selectedText}`
    const h4 = `#### ${selectedText}`
    const codeQuote = '`' + `${selectedText}` + '`'
    const quote = `>${selectedText}`
    const link = `[${selectedText}](${selectedText})`

    // if(isMounted){

    // }

    useEffect(() => {
        const saveSelection = () => {
            setHighlightedText(window.getSelection().toString())
        }
        document.addEventListener('mouseup', saveSelection)
        return () => document.removeEventListener('mouseup', saveSelection)
    }, [])

    const markdownHandle = (markdown) => {
        setArticleText(articleText.replace(highlightedText, markdown))
        console.log('update article')
    }

    return (
        <div className="text-input">
            <div className="editing-tool-bar">
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(bold)
                    }}>
                    B
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(italic)
                    }}>
                    i
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(h2)
                    }}>
                    h2
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(h3)
                    }}>
                    h3
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(h4)
                    }}>
                    h4
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(codeQuote)
                    }}>
                    code
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(quote)
                    }}>
                    quote
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(link)
                    }}>
                    link
                </button>
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
