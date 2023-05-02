"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesIntercept = void 0;
const message_send_1 = require("./message.send");
const message_remove_1 = require("./message.remove");
const message_get_1 = require("./message.get");
exports.MessagesIntercept = {
    get: message_get_1.get,
    send: message_send_1.send,
    remove: message_remove_1.remove
};
