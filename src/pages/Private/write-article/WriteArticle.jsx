import React, { useState, useEffect } from 'react'
import ArticleForm from '../../../components/ArticleForm'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import './WriteArticle.css'
// import { DraftsDataContext } from '../../../utils/context/drafsDataContext'

export default function WriteArticle() {
    const currentDate = new Date()
    const [articleDate, setArticleDate] = useState('')
    const [isDraft, setIsDraft] = useState()

    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const [validation, setValidation] = useState('')

    const [banner, setBanner] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [isBannerUploaded, setIsBannerUploaded] = useState(false)

    const defaultBanner = 'https://jker.fr/defaultbanner'

    // const publicArticles = useContext(PublicArticlesDataContext)
    // const drafts = useContext(DraftsDataContext)
    // const allArticles = publicArticles.concat(drafts)
    // const [isArticleExisting, setIsArticleExisting] = useState()

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

    // 1 - the form submitting starts here
    useEffect(() => {
        if (isDraft == true || isDraft == false) {
            console.log('isDraft : ')
            console.log(isDraft)
            uploadBanner(banner)
        } else {
            return
        }
    }, [isDraft])

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

    // useEffect(async () => {
    //     await allArticles.find(function (post) {
    //         if (title == post.title) {
    //             setValidation('This article title already exists')
    //             setIsArticleExisting(true)
    //         } else {
    //             setIsArticleExisting(true)
    //         }
    //     })
    // }, [isBannerUploaded])

    // 3 - finally, the article data goes to firestore
    useEffect(async () => {
        if (isBannerUploaded == true) {
            if (isDraft) {
                try {
                    await setDoc(doc(db, 'drafts', title.toLowerCase().replaceAll(' ', '-')), {
                        articleText,
                        bannerUrl,
                        articleDate,
                        title,
                        isDraft
                    })
                    setValidation('Article successfully posted')
                    console.log('Articled successfully posted')
                    setTitle('')
                    setArticleText('')
                    setArticleDate('')
                    setIsBannerUploaded(false)
                    navigate(`/`)
                } catch (err) {
                    console.log(err)
                    setValidation('Wopsy, there was an error posting the article')
                }
            }

            if (isDraft == false) {
                try {
                    await setDoc(doc(db, 'articles', title.toLowerCase().replaceAll(' ', '-')), {
                        articleText,
                        bannerUrl,
                        articleDate,
                        title,
                        isDraft
                    })
                    setValidation('Article successfully posted')
                    console.log('Articled successfully posted')
                    setTitle('')
                    setArticleText('')
                    setArticleDate('')
                    setIsBannerUploaded(false)
                    navigate(`/article/${title.toLowerCase().replaceAll(' ', '-')}`)
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
            <h1>Write an article</h1>
            <ArticleForm
                // setIsFormSubmitted={setIsFormSubmitted}
                setIsDraft={setIsDraft}
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
