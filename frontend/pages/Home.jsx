import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <h1 className='text-center pt-10'>Stay Connected, Effortlessly.</h1>
      <p className='text-center pt-10'>A modern chat experience built for speed, simplicity, and security.</p>
      <Link to={"/login"}><button className='cursor-pointer border-white border hover:bg-gray-800 hover:scale-105 duration-150 rounded-full p-1 px-4 mt-10'>Get's Start</button></Link>
    </div>
  )
}

export default Home