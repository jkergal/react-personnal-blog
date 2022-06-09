import React, { useState, useEffect } from 'react'
import './MarkdownEditor.css'

export default function MarkdownEditor({ setArticleText, articleText, setFormValuesChanged }) {
    const [highlightedText, setHighlightedText] = useState('')
    const [selectionStartPos, setSelectionStartPos] = useState(0)
    const [selectionEndPos, setSelectionEndPos] = useState(0)

    const bold = `**${highlightedText}**`
    const italic = `*${highlightedText}*`
    const h2 = `## ${highlightedText}`
    const h3 = `### ${highlightedText}`
    const h4 = `#### ${highlightedText}`
    const codeQuote = '```' + `\n${highlightedText}\n` + '```'
    const quote = `>${highlightedText}`
    const link = `[${highlightedText}](${highlightedText})`

    const code = '</>'

    const textAreaElements = document.getElementsByClassName('article-content-input')

    function setSelection(element) {
        let startPos = element.selectionStart
        let endPos = element.selectionEnd
        let selectedText = element.value.substring(startPos, endPos)

        if (selectedText.length <= 0) {
            console.log('⭕️')
            console.log('startPos: ' + startPos, ' | endPos: ' + endPos)
            console.log('No text selected')
            console.log('highlightedText: ' + highlightedText)
            setSelectionStartPos(startPos)
            setSelectionEndPos(endPos)
            setHighlightedText('')
        } else {
            console.log('🟢')
            console.log('startPos: ' + startPos, ' | endPos: ' + endPos)
            console.log('selectedText: ' + selectedText)
            console.log('highlightedText: ' + highlightedText)
            setSelectionStartPos(startPos)
            setSelectionEndPos(endPos)
            setHighlightedText(window.getSelection().toString())
        }
    }

    useEffect(() => {
        const resetSelection = async () => {
            await setHighlightedText('')
            console.log('hl text reseted')
        }

        document.addEventListener('mousedown', function () {
            resetSelection()
        })

        document.addEventListener('mouseup', function () {
            setSelection(textAreaElements.articleContent)
        })
    }, [])

    String.prototype.replaceBetween = function (start, end, what) {
        return this.substring(0, start) + what + this.substring(end)
    }

    const markdownHandle = (markdown) => {
        if (highlightedText == '' && selectionStartPos !== selectionEndPos) {
            return console.log('mouse clicked out')
        } else {
            setArticleText(articleText.replaceBetween(selectionStartPos, selectionEndPos, markdown))
            console.log(highlightedText)
            console.log('update article')
            console.log(selectionStartPos + ' - ' + selectionEndPos)
        }
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
                    <b>B</b>
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(italic)
                    }}>
                    <i>i</i>
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
                    {code}
                </button>
                <button
                    className="markdown-tool-button"
                    type="button"
                    onClick={() => {
                        markdownHandle(quote)
                    }}>
                    <b>&quot;</b>
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
                placeholder="Here is my best blog article..."
                onChange={(event) => {
                    setArticleText(event.target.value)
                    setFormValuesChanged(true)
                }}
                value={articleText}></textarea>
        </div>
    )
}
