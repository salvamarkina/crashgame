import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => newSocket.disconnect(); // Clean up the connection on unmount
    }, []);

    return socket;
};

export default useSocket;
