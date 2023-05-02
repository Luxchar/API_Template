"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRouter = void 0;
const intercept_messages_1 = require("./intercept.messages");
exports.MessagesRouter = {
    path: "/message",
    Get: {
        name: "get",
        method: "GET",
        path: "/get/:token/:message_id",
        socketing: true,
        description: "Get a message",
        params: ["token", "message_id"],
        res: intercept_messages_1.MessagesIntercept.get
    },
    Send: {
        name: "send",
        method: "POST",
        socketing: false,
        description: "Send a message to a channel",
        path: "/send/:channel_id",
        params: ["token", "channel_id", "message"],
        res: intercept_messages_1.MessagesIntercept.send
    },
    Remove: {
        name: "remove",
        method: "GET",
        socketing: false,
        description: "Remove a message from a channel",
        path: "/remove/:channel_id/:message_id",
        params: ["token", "channel_id", "message_id"],
        res: intercept_messages_1.MessagesIntercept.remove
    },
};
