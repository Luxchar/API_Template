"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsIntercept = void 0;
const manage_1 = require("./manage");
const create_1 = require("./create");
const update_1 = require("./update");
const get_1 = require("./get");
const user_1 = require("./user");
exports.ChannelsIntercept = {
    update: {
        channel_name: update_1.update.channel_name,
        permissions: update_1.update.permissions
    },
    create: {
        private: create_1.create.private,
        group: create_1.create.group,
        server: create_1.create.server
    },
    get: {
        channel: get_1.get.channel,
        members: get_1.get.members,
        messages: get_1.get.messages,
        permissions: get_1.get.permissions,
        created_at: get_1.get.created_at,
        updated_at: get_1.get.updated_at,
        members_count: get_1.get.members_count,
        channel_type: get_1.get.channel_type,
        channel_name: get_1.get.channel_name,
        owner_id: get_1.get.owner_id
    },
    management: {
        remove: manage_1.removeChannel,
    },
    member: {
        join: user_1.member.join,
        leave: user_1.member.leave
    },
    moderation: {
        kick: null
    }
};
