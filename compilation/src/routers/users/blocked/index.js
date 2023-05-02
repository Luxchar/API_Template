"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocked = void 0;
const users_add_blocked_1 = require("./users.add.blocked");
const users_remove_blocked_1 = require("./users.remove.blocked");
exports.blocked = {
    add: users_add_blocked_1.addBlocked,
    remove: users_remove_blocked_1.removeBlocked
};
