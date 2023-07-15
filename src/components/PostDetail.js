
import styles from './PostDetail.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { PostContext } from '../context/PostContent'

import { useAuthentication } from '../hooks/useAuthentication'
import { onAuthStateChanged } from 'firebase/auth'

export const PostDetail = ({ post }) => {
  const { posts } = useContext(PostContext)
  const [clicked, setClicked] = useState(false)
  const [tempImage, setTempImage] = useState(null)
  const [showTempImage, setShowTempImage] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [user,setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const [showAlert,setShowAlert] = useState(false)

//  const loadingUser = user === undefined

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    } )

  },[auth])

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${post.id}`)
    if (storedLikes) {
      setLikeCount(parseInt(storedLikes))
    }
  }, [post.id])
//  const auth = getAuth()  
  const handleLike = () => {
    if(user){
      setLikeCount(likeCount + 1)
    } else {
      setShowAlert(true)
    }
  }

  const deslike = () => {
    if(user){
      if(likeCount < 1){
        setLikeCount(0)
      } else{
        setLikeCount(likeCount - 1)
      }
    } else {
      setShowAlert(true)
    }
  }

  useEffect(() => {
    localStorage.setItem(`likes_${post.id}`, likeCount)
  }, [likeCount, post.id])

  const renderHearts = () => {
    const heartsToShow = likeCount > 20 ? 20 : likeCount
    const hearts = []
    for (let i = 0; i < heartsToShow; i++) {
      hearts.push(<span onClick={deslike} key={i} className={styles.heart}>❤️</span>)
    }
    return (
      <>
        {hearts}
      </>
    )
  }
  
  

  return (
    <div className={styles.post_detail}>
      <img onDoubleClick={handleLike} src={post.image} alt={post.title} />
      <div className={styles.likeTitulo} >
        <h2>{post.title} </h2>
        <p className={styles.likes}> {renderHearts()}</p>
      </div>
      <div className={styles.likeUsuario} >
      <p className={styles.createdby}>por {post.createdBy} </p>
      <p>Likes : {likeCount} </p>
      {showAlert && (
  <div className={styles.alert}>
    <p>É preciso estar logado para fazer isso.</p>
    <button onClick={() => setShowAlert(false)}>Fechar</button>
  </div>
)}

      </div>
      <div className={`${styles.tags} ${styles.btns}`}>
        {post.tagsArray.map((tag) => (
          <p key={tag}><span>#</span>{tag}</p>
        ))}
        <div className={styles.btns}>

        <button className={styles.like} onClick={handleLike}> 
        <i className=" fa-regular fa-thumbs-up  fa-beat"></i>
        </button>
        <button className={styles.deslike} onClick={deslike} >
        <i className="fa-regular fa-thumbs-down"></i>
        </button>
      </div>

      </div>
      <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail