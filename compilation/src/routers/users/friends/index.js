"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friends = void 0;
const users_add_friends_1 = require("./users.add.friends");
const users_remove_friends_1 = require("./users.remove.friends");
exports.friends = {
    add: users_add_friends_1.addFriend,
    remove: users_remove_friends_1.removeFriend
};
