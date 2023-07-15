import { useState,useEffect } from "react";
import { PostContext } from "../context/PostContent";
 const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      // Obtenha o valor do localStorage aqui e armazene-o no estado "posts"
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      setPosts(storedPosts);
    }, []);
  
    return (
      <PostContext.Provider value={{ posts, setPosts }}>
        {children}
      </PostContext.Provider>
    );
  };
  
  export default PostProvider