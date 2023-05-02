"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    ADMIN: ["admin"],
    MEMBER: {
        INVITE: ["member", "invite"],
        REMOVE: ["member", "remove"],
        BAN: ["member", "ban"],
        MANAGE: ["member", "manage"],
    },
    ROLES: {
        MANAGE: ["roles", "manage"],
        GIVE: ["roles", "give"],
    },
    CHANNELS: {
        MANAGE: ["channels", "manage"],
        VIEW: ["channels", "view"],
        SPEAK: ["channels", "speak"],
        VIDEO: ["channels", "video"],
        MOVE: ["channels", "move"],
    },
    MESSAGES: {
        SEND: ["messages", "send"],
        DELETE: ["messages", "delete"],
        MENTIONS: ["messages", "mentions"],
        SEND_FILES: ["messages", "send_files"],
    }
};
