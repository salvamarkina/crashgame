import io from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io('https://alphax.social:3002', {
            secure: true,
            rejectUnauthorized: false,
            transports: ['websocket', 'polling']
        });
    }
    return socket;
};
