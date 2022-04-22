import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '../../../assets/icons/pencil.svg'
import './EditButton.css'

export default function EditButton(props) {
    const navigate = useNavigate()
    const articleId = props.articleId

    const editDocHandler = async (articleId) => {
        navigate(`/private/edit-article/${articleId}`)
    }

    return (
        <div>
            <button
                className="edit-article-button"
                onClick={() => {
                    editDocHandler(articleId)
                }}>
                <img src={EditIcon} alt="Pencil edit icon" />
            </button>
        </div>
    )
}
