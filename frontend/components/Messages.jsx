import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";
import toast from 'react-hot-toast';
import GetConversation from '../hooks/getConversation';
import GetRealTimeMessages from '../hooks/getRealTimeMessages';


const Messages = () => {
    GetConversation();
    GetRealTimeMessages();

    const { messages } = useSelector(state => state.message)
    const { user, activeUser } = useSelector(state => state.user);

    const [message, setMessage] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.length > 0) {
            const res = await fetch('https://fluxa-chat-application.onrender.com/api/message/sendmessage', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ textMessage: message, receiverId: activeUser._id })
            });
            const data = await res.json();
            if (data.success) {
                setMessage('')
            }
            else {
                toast.error(data);
            }

        } else {
            toast.error("Enter message");
        }
    }

    return (
        <div className='w-[60%]'>
            {activeUser ?
                <>
                    <div className='flex gap-3 p-3 items-center border-b border-gray-800'>
                        <img src={activeUser?.profilePhoto} className='rounded-full w-8 h-8' alt="" />
                        <p className='text-white font-semibold text-sm'>{activeUser?.username}</p>
                    </div>
                    <div className='h-[83%] overflow-y-scroll  p-3'>
                        {
                            messages?.map((message, index) => {
                                const me = user._id === message.senderId
                                return <div key={index} className={`flex ${me && "justify-end"}`}>
                                    <div className={`flex flex-col ${me && "items-end"} max-w-xs`}>
                                        <div className={`${me ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"} px-4 py-2 rounded-2xl  shadow`}>
                                            {message?.message}
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1 ml-1">
                                            {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                    </div>
                                </div>

                            }, [])
                        }
                    </div>
                    <form onSubmit={handleSendMessage} className='border-t border-gray-800 p-3 flex items-center  gap-3'>
                        <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='w-full outline-none text-sm' placeholder='Type a message' />
                        <button type='submit'><IoSend className='text-white cursor-pointer' /></button>
                    </form>
                </> :
                <div className='flex items-center justify-center w-full h-full '>
                    Select chat to start conversation
                </div>
            }
        </div >
    )
}

export default Messages