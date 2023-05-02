import { Socket } from "socket.io"
import ServerSocket from ".."
import verifySocket from "./verify.utils"

export default async (socket: Socket) : Promise<void>=> {
    if(await verifySocket(socket)) delete ServerSocket.users[ServerSocket.socket.id]
}