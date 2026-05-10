import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user?._id) return;

        const newSocket = io("https://fluxa-chat-application.onrender.com", {
            query: { user: user._id }
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [user?._id])

    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>

}

export const useSocket = () => useContext(SocketContext);