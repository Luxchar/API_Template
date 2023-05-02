"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    ADMIN: ["admin"],
    VIEW: ["view"],
    MEMBER: {
        INVITE: ["member", "invite"],
        REMOVE: ["member", "remove"],
    },
    MESSAGE: {
        SEND: ["message", "send"],
        MENTIONS: ["message", "mentions"],
        SEND_FILES: ["message", "send_files"],
    },
    ALL: ["admin", "view", "member", "message", "invite", "remove", "send", "mentions", "send_files"]
};
