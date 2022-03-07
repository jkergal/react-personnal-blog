import React, { useState, useEffect } from 'react'
import ArticleForm from '../../../components/ArticleForm'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import './WriteArticle.css'

export default function WriteArticle() {
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

    const navigate = useNavigate()

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

    // 1 - form subimitting start here with the button onClick event
    const articleSubmitHandler = async (e) => {
        e.preventDefault()
        uploadBanner(banner)
    }

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

    // 3 - finally when banner's uploaded on the firebase storage, it posts the article form data in the firebase db
    useEffect(async () => {
        if (isBannerUploaded == true) {
            try {
                await setDoc(doc(db, 'articles', title.toLowerCase().replaceAll(' ', '-')), {
                    articleText,
                    bannerUrl,
                    articleDate,
                    title
                })
                setValidation('Article successfully posted')
                console.log('Articled successfully posted')
                setTitle('')
                setArticleText('')
                setArticleDate('')
                setIsBannerUploaded(false)
                navigate('/')
            } catch (err) {
                console.log(err)
                setValidation('Wopsy, there was an error posting the article')
            }
        } else {
            return
        }
    }, [isBannerUploaded])

    return (
        <div className="write-articles-page">
            <h1>Write an article</h1>
            <ArticleForm
                isEditionMode={false}
                submittingType="Post"
                bannerUploadingLabel="Choose a banner for your article :"
                setTitle={setTitle}
                title={title}
                setArticleText={setArticleText}
                articleText={articleText}
                chooseFileHandler={chooseFileHandler}
                progress={progress}
                validation={validation}
                articleSubmitHandler={articleSubmitHandler}
            />
        </div>
    )
}
