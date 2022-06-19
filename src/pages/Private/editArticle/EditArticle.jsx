import React, { useState, useEffect, useContext } from 'react'
import ArticleForm from '../../../components/articleForm/ArticleForm'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useParams } from 'react-router-dom'
import './EditArticle.css'
import { FirestoreDataContext } from '../../../utils/context/firestoreDataContext'

export default function WriteArticle() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [isChangingCollection, setIsChangingCollection] = useState()
    const [isGoingToDraft, setIsGoingToDraft] = useState()

    const [articleDate, setArticleDate] = useState('')
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')
    const [articleStatus, setArticleStatus] = useState('')

    const [validation, setValidation] = useState('')

    const [banner, setBanner] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [isBannerUploaded, setIsBannerUploaded] = useState(false)

    const { articleId } = useParams('')

    const [articleData, setArticleData] = useState({})

    const { publicArticles } = useContext(FirestoreDataContext)
    const { drafts } = useContext(FirestoreDataContext)
    const allArticles = publicArticles.concat(drafts)

    const defaultBanner = 'https://jker.fr/defaultbanner'

    const deleteSpecialCharacters = (string) => {
        return string
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('’', '-')
            .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '')
            .replaceAll('--', '-')
    }

    const deleteDraft = async (articleId) => {
        await deleteDoc(doc(db, 'drafts', articleId))
        console.log('article deleted')
        location.reload()
    }

    useEffect(async () => {
        const article = await allArticles.find(function (post) {
            if (post.id == articleId) return true
        })
        setArticleData(article)
    }, [])

    useEffect(() => {
        setTitle(articleData.title)
        setArticleText(articleData.articleText)
        setArticleDate(articleData.articleDate)
        setArticleStatus(articleData.isDraft)
    }, [articleData])

    const chooseFileHandler = async (e) => {
        e.preventDefault()
        console.log(e.target.files[0])
        const maxBannerSize = 300 * 1000
        const bannerSize = e.target.files[0].size
        if (bannerSize > maxBannerSize) {
            setValidation('Max file size : 250ko, please choose another banner.')
            return
        } else {
            setBanner(e.target.files[0])
        }
    }

    // 1 - the form submitting starts here
    useEffect(() => {
        if (isFormSubmitted == true) {
            console.log('isFormSubmitted : ')
            console.log(isFormSubmitted)
            uploadBanner(banner)
        } else {
            return
        }
    }, [isFormSubmitted])

    // 2 - then the handler uplaod the banner in the firebase storage
    const uploadBanner = (banner) => {
        if (!banner) {
            setBannerUrl(defaultBanner)
            setIsBannerUploaded(true)
        } else {
            const sotrageRef = ref(storage, `banners/${banner.name}`)
            const uploadTask = uploadBytesResumable(sotrageRef, banner)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgress(prog)
                },
                (error) => console.log('there is an error : ' + error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        setBannerUrl(downloadURL)
                        setIsBannerUploaded(true)
                    })
                }
            )
        }
    }

    // 3 - finally, the article data goes to firestore
    useEffect(async () => {
        if (isBannerUploaded == true) {
            if (isGoingToDraft && !isChangingCollection) {
                try {
                    await setDoc(doc(db, 'drafts', deleteSpecialCharacters(title)), {
                        articleText,
                        bannerUrl,
                        articleDate,
                        title,
                        isDraft: true
                    })
                    setValidation('Article successfully posted')
                    console.log('Articled successfully posted')
                    setIsBannerUploaded(false)
                    setIsFormSubmitted(false)
                    setTimeout(() => {
                        setProgress(0)
                        setValidation('')
                    }, 2500)
                } catch (err) {
                    console.log(err)
                    setValidation('Wopsy, there was an error posting the article')
                }
            }

            if (!isGoingToDraft && !isChangingCollection) {
                try {
                    await setDoc(doc(db, 'articles', deleteSpecialCharacters(title)), {
                        articleText,
                        bannerUrl,
                        articleDate,
                        title,
                        isDraft: false
                    })
                    setValidation('Article successfully posted')
                    console.log('Articled successfully posted')
                    setIsBannerUploaded(false)
                    setIsFormSubmitted(false)
                    setTimeout(() => {
                        setProgress(0)
                        setValidation('')
                    }, 2500)
                } catch (err) {
                    console.log(err)
                    setValidation('Wopsy, there was an error posting the article')
                }
            }

            if (!isGoingToDraft && isChangingCollection) {
                try {
                    await setDoc(doc(db, 'articles', deleteSpecialCharacters(title)), {
                        articleText,
                        bannerUrl,
                        articleDate,
                        title,
                        isDraft: false
                    })
                    deleteDraft(articleId)
                    setValidation('Article successfully posted')
                    console.log('Articled successfully posted')
                    setIsBannerUploaded(false)
                    setIsFormSubmitted(false)
                    console.log('is NOT')
                    setTimeout(() => {
                        setProgress(0)
                        setValidation('')
                    }, 2500)
                } catch (err) {
                    console.log(err)
                    setValidation('Wopsy, there was an error posting the article')
                }
            }
        } else {
            return
        }
    }, [isBannerUploaded])

    return (
        <div className="write-articles-page">
            <ArticleForm
                isNewArticle={false}
                isDraft={articleStatus}
                setIsGoingToDraft={setIsGoingToDraft}
                setIsFormSubmitted={setIsFormSubmitted}
                setIsChangingCollection={setIsChangingCollection}
                articleDataIsDraft={articleData.isDraft}
                isEditionMode={true}
                bannerUploadingLabel="Change your article banner :"
                setTitle={setTitle}
                title={title}
                setArticleText={setArticleText}
                articleText={articleText}
                chooseFileHandler={chooseFileHandler}
                progress={progress}
                validation={validation}
            />
        </div>
    )
}
