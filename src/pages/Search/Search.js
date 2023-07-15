import styles from './Search.module.css'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// componenst
import PostDetail from '../../components/PostDetail'
import { Link } from 'react-router-dom'

const Search = () => {

    const query = useQuery()
    const search = query.get("q")
    const [label,setLabel] = useState()

    const navigate = useNavigate()

    const {documents: posts} = useFetchDocuments('posts', search)

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(label){
            return navigate(`/search?q=${label}`)
         } else{
            
         }

    }


    return (
      <div className={styles.search_container}>
        <h1>Search</h1>

        <div>
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados posts a partir da sua busca</p>
              <Link to="/" className="btn btn-dark">
                Voltar
              </Link>
            </div>
          )}
        {posts && posts.length > 0 && (
        
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input className={styles.search}
            type="text"
            placeholder="Tags..."
            onChange={(e) => setLabel(e.target.value)}
          />
          <button className="btn btn-dark">Pesquisar</button>
        </form>

        
    )}
          {posts &&
            posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
      </div>
    );
}

export default Search