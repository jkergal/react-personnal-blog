import React, { useState, useEffect } from 'react'

export default function MarkdownEditor({ setArticleText, articleText }) {
    const [highlightedText, setHighlightedText] = useState('')

    const [isMouseUp, setIsMouseUp] = useState(false)
    const [selectionStartPos, setSelectionStartPos] = useState(0)
    const [selectionEndPos, setSelectionEndPos] = useState(0)

    const selectedText = highlightedText
    const bold = `**${selectedText}**`
    const italic = `*${selectedText}*`
    const h2 = `## ${selectedText}`
    const h3 = `### ${selectedText}`
    const h4 = `#### ${selectedText}`
    const codeQuote = '```' + `\n${selectedText}\n` + '```'
    const quote = `>${selectedText}`
    const link = `[${selectedText}](${selectedText})`

    useEffect(() => {
        var textAreaElements = document.getElementsByClassName('article-content-input')

        ;[...textAreaElements].forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                console.log('mouse in text area')
            })

            element.addEventListener('mouseout', function () {
                console.log('mouse out from text area')
            })

            document.addEventListener('mouseup', function () {
                setIsMouseUp(true)
            })
        })
    }, [])

    useEffect(() => {
        console.log(isMouseUp)

        const selection = function (element) {
            let startPos = element.selectionStart
            let endPos = element.selectionEnd
            let selectedText = element.value.substring(startPos, endPos)
            setHighlightedText(window.getSelection().toString())

            if (selectedText.length <= 0) {
                return
            }

            console.log('startPos: ' + startPos, ' | endPos: ' + endPos)
            console.log('selectedText: ' + selectedText)
            setSelectionStartPos(startPos)
            setSelectionEndPos(endPos)

            return
        }

        var textAreaElements = document.getElementsByClassName('article-content-input')

        ;[...textAreaElements].forEach(function (element) {
            if (isMouseUp == true) {
                selection(element)
                console.log(element)
                setIsMouseUp(false)
            }

            element.addEventListener('mouseup', function () {
                setIsMouseUp(true)
            })
        })
    }, [isMouseUp])

    String.prototype.replaceBetween = function (start, end, what) {
        return this.substring(0, start) + what + this.substring(end)
    }

    const markdownHandle = (markdown) => {
        setArticleText(articleText.replaceBetween(selectionStartPos, selectionEndPos, markdown))
        console.log(highlightedText)
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
