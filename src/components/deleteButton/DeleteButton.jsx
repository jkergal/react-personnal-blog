import React from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import TrashIcon from '../../assets/icons/trash.svg'
import './DeleteButton.css'

export default function EditButton(props) {
    const navigate = useNavigate()
    const articleId = props.articleId
    const collection = props.collection
    const fetchUpdate = props.fetchUpdate

    const deleteDocHandler = async (articleId, collection, fetchUpdate) => {
        try {
            await deleteDoc(doc(db, collection, articleId))
            console.log('article deleted')
            fetchUpdate
        } catch (error) {
            console.error(error)
        } finally {
            navigate(`/private/dashboard`)
            console.log('navigation done')
        }
    }

    return (
        <div>
            <button
                className="delete-article-button"
                onClick={() => {
                    deleteDocHandler(articleId, collection, fetchUpdate())
                }}>
                <img src={TrashIcon} alt="Trash delete icon" />
            </button>
        </div>
    )
}
