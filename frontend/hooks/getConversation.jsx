import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  setMessages } from '../redux/messageSlice';
import toast from 'react-hot-toast';

const GetConversation = () => {
    const dispatch = useDispatch();
    const { activeUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchConversation = async () => {
            const res = await fetch('https://fluxa-chat-application.vercel.app/api/message/getconversation', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ receiverId: activeUser?._id, })
            });
            const data = await res.json();
            if (data.success) {
                dispatch(setMessages(data?.conversation?.messages));
            }
            else {
                toast.error(data);
            }
        }
        fetchConversation();
    }, [activeUser])
}

export default GetConversation