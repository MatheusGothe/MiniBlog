
import './App.css';
// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import  Search  from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost'
import ResetPassword from './pages/ResetPassword/ResetPassword';

// context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';


// hooks
import { useState,useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import  PostProvider  from './components/PostProvider'


function App() {

  const [user,setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser){
    return (
      <p>Carregando...</p>
    )
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
      <PostProvider>
        <BrowserRouter>
          {/*Teste git */}
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/registro"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/post/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
             {/*
             <Route path='/reset-password' element={<ResetPassword />} />
              */
          }
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
     
          </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
