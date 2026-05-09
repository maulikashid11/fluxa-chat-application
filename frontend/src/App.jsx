import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Chat from '../pages/Chat'
import Profile from '../pages/Profile'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://fluxa-chat-application.vercel.app/api/users/getuser", {
        headers:{
          "Content-Type":"application/json"
        },
        credentials: "include",
      })
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
      }else{
        navigate('/login')
      }
    }
    fetchUser();
  }, [])
  return (
    <>
      <Navbar />
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
