import styles from './Post.module.css'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useState,useEffect,useContext } from 'react'
import { PostContext } from '../../context/PostContent'


//hooks
import { useParams} from 'react-router-dom'

// components

const Post = () => {
   // const { posts } = useContext(PostContext)
  //  const [storedLikes, setStoredLikes] = useState(localStorage.getItem(`likes_${post.id}`))
    const {id} = useParams()
    const {document: post, loading} = useFetchDocument('posts',id)


  //  const nome = localStorage.getItem('likes'[likeCount])
    //console.log(nome)

   // console.log(likeCount)
  
//   const [likeCount, setLikeCount] = useState(localStorage.getItem(`likes_${post.id}`))
/*
  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${post.id}`)
    if (storedLikes) {
      setLikeCount(parseInt(storedLikes))
    }
  }, [post.id])
*/
 /* const handleLike = () => {
    setLikeCount(likeCount + 1)
  }

  const deslike = () => {
    setLikeCount(likeCount - 1)
  }

  useEffect(() => {
    localStorage.setItem(`likes_${post.id}`, likeCount)
  }, [likeCount, post.id])

  const renderHearts = () => {
    const hearts = []
    for (let i = 0; i < likeCount; i++) {
      hearts.push(<span onClick={deslike} key={i} className={styles.heart}>❤️</span>)
    }
    return hearts
  }
*/
  return (
    <div className={styles.post_container} >
        {/*loading && <p>Carregando post...</p>*/}
        {post && (
            <>
              <h1> {post.title} </h1>
             {/*   <p> {storedLikes} </p>*/}
              <img src={post.image} alt={post.title} />
              <p>{post.body}</p>
              <h3>Este post trata sobre:</h3>
              <div className={styles.tags} >
              {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag} </p>
              ) )}
              </div>

            </>
        )}
    </div>
  )
}

export default Post