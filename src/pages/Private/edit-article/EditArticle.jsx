import React, { useState, useEffect } from 'react'
import ArticleForm from '../../../components/ArticleForm'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditArticle.css'

export default function WriteArticle() {
    const [articleDate, setArticleDate] = useState('')

    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    // const articlesCollectionRef = collection(db, 'articles')
    const [validation, setValidation] = useState('')

    const [banner, setBanner] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [isBannerUploaded, setIsBannerUploaded] = useState(false)

    const { articleId } = useParams('')
    const [articleData, setArticleData] = useState({})
    const docRef = doc(db, 'articles', `${articleId}`)

    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef)

                console.log('response firebase', docSnap)

                if (docSnap.exists() && mounted) {
                    console.log('docSnap.data()', docSnap.data())
                    setArticleData(docSnap.data())
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
        return () => (mounted = false)
    }, [])

    useEffect(() => {
        setTitle(articleData.title)
        setArticleText(articleData.articleText)
        setArticleDate(articleData.articleDate)
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

    const articleSubmitHandler = async (e) => {
        e.preventDefault()
        uploadBanner(banner)
    }

    const uploadBanner = (banner) => {
        if (!banner) {
            return console.log('error banner is empty')
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
            <h1>Edit your article</h1>
            <ArticleForm
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
