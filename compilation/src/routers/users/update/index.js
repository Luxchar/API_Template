"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const users_avatar_update_1 = require("./users.avatar.update");
const users_password_update_1 = require("./users.password.update");
const users_username_update_1 = require("./users.username.update");
const users_wallet_update_1 = require("./users.wallet.update");
const users_status_update_1 = require("./users.status.update");
const users_channels_update_1 = require("./users.channels.update");
const users_servers_update_1 = require("./users.servers.update");
exports.update = {
    username: users_username_update_1.usernameUpdate,
    password: users_password_update_1.passwordUpdate,
    avatar: users_avatar_update_1.avatarUpdate,
    wallet_token: users_wallet_update_1.walletUpdate,
    status: users_status_update_1.statusUpdate,
    channels: users_channels_update_1.channelsUpdate,
    servers: users_servers_update_1.serversUpdate
};
