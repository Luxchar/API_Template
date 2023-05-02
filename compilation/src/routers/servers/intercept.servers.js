"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerIntercept = void 0;
const get_1 = require("./get");
const manage_1 = require("./manage");
const update_1 = require("./update");
exports.ServerIntercept = {
    manage: {
        create: manage_1.create,
        remove: manage_1.remove
    },
    get: {
        server: get_1.get.server,
        channels: get_1.get.channels,
        members: get_1.get.members,
        permissions: get_1.get.permissions,
        created_at: get_1.get.created_at,
        updated_at: get_1.get.updated_at,
        members_count: get_1.get.members_count,
        server_name: get_1.get.server_name,
        owner_id: get_1.get.owner_id,
        server_icon: get_1.get.server_icon
    },
    update: {
        name: update_1.update.name,
        icon: update_1.update.icon,
        channels: update_1.update.channels
    }
};
