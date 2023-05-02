"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.member = void 0;
const channels_add_user_1 = require("./channels.add.user");
const channels_leave_user_1 = require("./channels.leave.user");
exports.member = {
    join: channels_add_user_1.join,
    leave: channels_leave_user_1.leave
};
