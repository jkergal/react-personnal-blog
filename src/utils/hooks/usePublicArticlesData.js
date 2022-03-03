import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.config'

const usePublicArticlesData = () => {
    const [publicArticles, setPublicArticles] = useState([])
    const docRef = collection(db, 'articles')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(docRef)
                // const publicArticlesResponse = []
                // await docSnap.forEach((doc) => {
                //     const id = doc.id
                //     const articleData = doc.data()
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(id, ' => ', articleData)
                //     const createArticlesArray = (doc) => {
                //         publicArticlesResponse.push({ doc })
                //     }
                //     createArticlesArray(articleData)
                // })

                setPublicArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

                console.log('response firebase', data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()

        return publicArticles
    }, [])

    useEffect(() => {
        console.log('public articles :')
        // console.log(publicArticles)
        // publicArticles.map((article) => {
        //     console.log(article.id)
        // })
        publicArticles.find((article) => article.id == 'test-article-with-code')
    }, [publicArticles])
}

export default usePublicArticlesData
