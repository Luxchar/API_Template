"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIntercept = void 0;
const update_1 = require("./update");
const connect_1 = require("./connect");
const get_1 = require("./get");
const blocked_1 = require("./blocked");
exports.UserIntercept = {
    register: connect_1.userRegister,
    login: connect_1.userLogin,
    connect: connect_1.userConnect,
    get: {
        user: get_1.get.UserbyToken,
        username: get_1.get.Username,
        updated_at: get_1.get.UpdatedAt,
        created_at: get_1.get.CreatedAt,
    },
    update: {
        username: update_1.update.username,
        password: update_1.update.password,
        avatar: update_1.update.avatar,
        wallet_token: update_1.update.wallet_token,
        status: update_1.update.status,
        channels: update_1.update.channels,
        servers: update_1.update.servers
    },
    blocked: {
        add: blocked_1.blocked.add,
        remove: blocked_1.blocked.remove
    }
};
