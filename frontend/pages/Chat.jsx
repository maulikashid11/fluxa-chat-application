import React from 'react'
import { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { setActiveUser, setOnlineUsers, setOtherUsers, setUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Messages from '../components/Messages';
import { useSocket } from '../contexts/socket';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers, onlineUsers, activeUser } = useSelector(state => state.user);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("getusers", (data) => {
      dispatch(setOnlineUsers(data));
    });

    return () => {
      socket.off("getusers");
    };
  }, [socket]);


  const handleLogout = async () => {
    const res = await fetch("http://localhost:3000/api/users/logout", {
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      dispatch(setUser(null));
      navigate('/login')
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/api/users/getotherusers", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setOtherUsers(data.otherUsers));
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className='flex justify-center h-[calc(100vh-50px)]'>
      <div className='border-r border-gray-800 w-[40%]  p-5'>
        <div className='bg-zinc-800 rounded-full w-full h-8 p-3 flex items-center justify-center gap-3'>
          <FaSearch />
          <input type="text" className='w-full outline-none text-sm' placeholder='Search or start a new chat' />
        </div>
        <div className='flex flex-col gap-4 mt-3 scrollbar overflow-auto h-[85%] '>
          {otherUsers.map((n, i) => {
            return <div onClick={() => { dispatch(setActiveUser(n)) }} key={i} className={`relative flex justify-between p-2 rounded-full duration-200 text-sm items-center hover:bg-zinc-800 ${activeUser?._id === n._id && 'bg-zinc-700'}`}>
              <div className='flex gap-3 items-center'>
                <img src={n.profilePhoto} className='rounded-full w-8 h-8' alt="" />
                {
                  onlineUsers.includes(n._id) &&
                  <div className='absolute w-2 h-2  left-8 bottom-8 bg-green-500 rounded-full'></div>
                }
                <p className='text-white'>{n.username}</p>
              </div>

            </div>
          })}
        </div>
        <button onClick={() => { handleLogout() }} className='cursor-pointer border-red-500 text-red-500 text-xs border hover:bg-gray-800 hover:scale-105 duration-150 rounded-full p-1 px-4 my-2'>Logout</button>
      </div>
      <Messages />
    </div>
  )
}

export default Chat