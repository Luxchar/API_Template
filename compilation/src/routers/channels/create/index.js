"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const channels_create_group_1 = require("./channels.create.group");
const channels_create_private_1 = require("./channels.create.private");
const channels_create_server_1 = require("./channels.create.server");
exports.create = {
    group: channels_create_group_1.create_group,
    private: channels_create_private_1.create_private,
    server: channels_create_server_1.create_server
};
