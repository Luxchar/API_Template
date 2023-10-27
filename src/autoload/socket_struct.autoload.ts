import { Socket } from "socket.io";
import { User } from "../database/models/User";

export interface UserSocket extends Socket{
    storage: {
        socket_id: string;
        ip: string;
        logged: boolean;
        user: User | null;
    }
}


export function redefineSocket(socket: Socket): UserSocket {
    const sock = socket as UserSocket;
    sock.storage = {
        socket_id: socket.id,
        ip: socket.handshake.address,
        logged: false,
        user: null
    }
    return sock;
}

