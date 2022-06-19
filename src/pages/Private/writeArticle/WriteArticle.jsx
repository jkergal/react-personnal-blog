import React, { useState, useEffect, useContext } from 'react'
import ArticleForm from '../../../components/articleForm/ArticleForm'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import './WriteArticle.css'
import { FirestoreDataContext } from '../../../utils/context/firestoreDataContext'

export default function WriteArticle() {
    const [formValuesChanged, setFormValuesChanged] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [isGoingToDraft, setIsGoingToDraft] = useState()

    const currentDate = new Date()
    const [articleDate, setArticleDate] = useState('')
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const [validation, setValidation] = useState('')

    const [banner, setBanner] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [isBannerUploaded, setIsBannerUploaded] = useState(false)

    const defaultBanner = 'https://jker.fr/defaultbanner'

    const { fetchPublicArticles } = useContext(FirestoreDataContext)
    const { fetchDrafts } = useContext(FirestoreDataContext)

    const navigate = useNavigate()

    const deleteSpecialCharacters = (string) => {
        return string
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('’', '-')
            .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '')
            .replaceAll('--', '-')
    }

    // useEffect(() => {
    //     setFormValuesChanged(true)
    //     console.log('Values Has Changed')
    // }, [articleText, title])

    useEffect(() => {
        console.log('Values Has Changed')
        console.log(formValuesChanged)
    }, [formValuesChanged])

    // save date in the state at first render of the page
    useEffect(() => {
        setArticleDate(currentDate)
        console.log(currentDate)
    }, [])

    // save chosen file in the state
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

    // 2 - then the handler uplaod the file in the firebase storage
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
            if (isGoingToDraft) {
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
                    setFormValuesChanged(false)
                    fetchDrafts().then(() =>
                        navigate(`/private/edit-article/${deleteSpecialCharacters(title)}`)
                    )
                } catch (err) {
                    console.log(err)
                    setValidation('Wopsy, there was an error posting the article')
                }
            }

            if (!isGoingToDraft) {
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
                    fetchPublicArticles().then(() =>
                        navigate(`/private/edit-article/${deleteSpecialCharacters(title)}`)
                    )
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
                isNewArticle={true}
                setFormValuesChanged={setFormValuesChanged}
                setIsGoingToDraft={setIsGoingToDraft}
                setIsFormSubmitted={setIsFormSubmitted}
                isEditionMode={false}
                bannerUploadingLabel="Choose a banner for your article :"
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
