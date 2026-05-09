import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { useSocket } from '../contexts/socket';

const GetRealTimeMessages = () => {
    const socket = useSocket();

    const { messages } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (data) => {
            dispatch(setMessages([...messages,data]))
        })
        return () => socket?.off("newMessage");
    }, [setMessages,messages])
}

export default GetRealTimeMessages