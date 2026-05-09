import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className='px-12 py-2 flex justify-between items-center border-b border-gray-800'>
      <Link to={'/'}><p className='text-xl font-bold text-white drop-shadow-[0_0_8px_#3b82f6]'>Fluxa</p></Link>
      {
        !user ?
          <Link to={'/login'}><button className='cursor-pointer border-white text-xs border hover:bg-gray-800 hover:scale-105 duration-150 rounded-full p-1 px-4'>Login</button></Link>
          : <img className='w-7 h-7 rounded-full' src={user?.profilePhoto} />
      }
    </div>
  )
}

export default Navbar