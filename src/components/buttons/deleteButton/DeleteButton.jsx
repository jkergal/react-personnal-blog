import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import { FirestoreDataContext } from '../../../utils/context/firestoreDataContext'
import TrashIcon from '../../../assets/icons/trash.svg'
import './DeleteButton.css'

export default function EditButton(props) {
    const navigate = useNavigate()
    const articleId = props.articleId
    const collection = props.collection
    const { fetchPublicArticles } = useContext(FirestoreDataContext)
    const { fetchDrafts } = useContext(FirestoreDataContext)

    const deleteDocHandler = async (articleId, collection) => {
        try {
            await deleteDoc(doc(db, collection, articleId))
        } catch (error) {
            console.error(error)
        } finally {
            console.log('article deleted')
        }
    }

    return (
        <div>
            {collection === 'articles' ? (
                <button
                    className="delete-article-button"
                    onClick={() => {
                        deleteDocHandler(articleId, collection)
                            .then(() => {
                                fetchPublicArticles()
                            })
                            .then(() => {
                                navigate(`/private/dashboard`)
                            })
                    }}>
                    <img src={TrashIcon} alt="Trash delete icon" />
                </button>
            ) : (
                <button
                    className="delete-article-button"
                    onClick={() => {
                        deleteDocHandler(articleId, collection)
                            .then(() => {
                                fetchDrafts()
                            })
                            .then(() => {
                                navigate(`/private/dashboard`)
                            })
                    }}>
                    <img src={TrashIcon} alt="Trash delete icon" />
                </button>
            )}
        </div>
    )
}
