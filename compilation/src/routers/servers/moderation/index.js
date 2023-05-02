"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const servers_user_ban_1 = require("./servers.user.ban");
const servers_user_kick_1 = require("./servers.user.kick");
const servers_user_unban_1 = require("./servers.user.unban");
const servers_user_timeout_1 = require("./servers.user.timeout");
const servers_user_untimeout_1 = require("./servers.user.untimeout");
exports.user = {
    ban: servers_user_ban_1.userBan,
    kick: servers_user_kick_1.userKick,
    unban: servers_user_unban_1.userUnban,
    timeout: servers_user_timeout_1.userTimeout,
    untimeout: servers_user_untimeout_1.userUnTimeout
};
