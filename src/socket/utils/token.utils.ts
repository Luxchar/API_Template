import { Socket } from "socket.io";

export const getSocketToken = () => {
    const socket: Socket = this as any;

    console.log(socket.id)
}