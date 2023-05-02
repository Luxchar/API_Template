import { Socket } from "socket.io";
import ServerSocket from ".."

export default async (socket: Socket) : Promise<boolean> => {
    if(!socket) return false;
    if(!socket.id) return false;
    if(ServerSocket.users[socket.id]) return true;
    return false;
}