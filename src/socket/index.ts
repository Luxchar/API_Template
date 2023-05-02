import { Socket } from "socket.io"
import Logger from "../client/logger.client"
import { ISocketUsers } from "./socket.interfaces";
import { utils } from "./utils";

export default class ServerSocket {
    static io: Socket;
    static users: ISocketUsers = {};
    static channels: any = {};
    static id: any;
    static socket: Socket;
    static EventHandler: any;
    

    static events: Array<string> = [
        // "login", 
        // "messageCreate", 
        // "messageDelete",
        // "messageGet", 
        // "friendAdd", 
        // "friendRemove", 
        // "friendRequestsReceived", 
        // "roleCreate", 
        // "roleDelete", 
        // "roleGet", 
        // "channelCreate", 
        // "channelDelete", 
        // "channelsGet", 
        // "pingUser",
        // "disconnect",
        // "callUser",
        // "callChannel",
        // "userBlockedAdd",
        // "userBlockedRemove",
        // "userGet",
    ]

    constructor(server: any){
        try{
            ServerSocket.io = require("socket.io")(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "PUT", "POST", "DELETE"],
                    allowedHeaders: [
                        "Access-Control-Allow-Headers",
                        "X-Requested-With",
                        "X-Access-Token",
                        "Content-Type",
                        "Host",
                        "Accept",
                        "Connection",
                        "Cache-Control",
                        ],
                    credentials: true,
                    optionsSuccessStatus: 200,
                }
            })

            
        } catch(err) {
            Logger.error(err)
        }
    }


    async run(){
        try {
            ServerSocket.io.on("connection", async (socket: Socket) => {
                Logger.debug("New connection from " + socket.id)
                
                //  ServerSocket.EventHandler = new SocketEvents(socket);

                // for(let event of ServerSocket.events){
                //     if(typeof event !== "string") break;
                //     socket.on(event, ServerSocket.EventHandler[event].bind(ServerSocket.EventHandler))
                // }
            })
        } catch(err) {
            Logger.error(err)
        }
    }
}