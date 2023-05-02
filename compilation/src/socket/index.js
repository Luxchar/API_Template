"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../client/logger.client"));
const events_1 = require("./events");
class ServerSocket {
    constructor(server) {
        try {
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
            });
        }
        catch (err) {
            logger_client_1.default.error(err);
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ServerSocket.io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
                    logger_client_1.default.debug("New connection from " + socket.id);
                    ServerSocket.EventHandler = new events_1.SocketEvents(socket);
                    for (let event of ServerSocket.events) {
                        if (typeof event !== "string")
                            break;
                        socket.on(event, ServerSocket.EventHandler[event].bind(ServerSocket.EventHandler));
                    }
                }));
            }
            catch (err) {
                logger_client_1.default.error(err);
            }
        });
    }
}
ServerSocket.users = {};
ServerSocket.channels = {};
ServerSocket.events = [
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
];
exports.default = ServerSocket;
