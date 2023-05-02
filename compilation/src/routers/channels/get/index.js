"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const channels_get_1 = require("./channels.get");
const channels_members_get_1 = require("./channels.members.get");
const channels_messages_get_1 = require("./channels.messages.get");
const channels_permissions_get_1 = require("./channels.permissions.get");
const channels_created_at_get_1 = require("./channels.created_at.get");
const channels_updated_at_get_1 = require("./channels.updated_at.get");
const channels_members_count_get_1 = require("./channels.members_count.get");
const channels_type_get_1 = require("./channels.type.get");
const channels_name_get_1 = require("./channels.name.get");
const channels_owner_get_1 = require("./channels.owner.get");
exports.get = {
    channel: channels_get_1.getChannel,
    members: channels_members_get_1.getMembers,
    messages: channels_messages_get_1.getMessages,
    permissions: channels_permissions_get_1.getPermissions,
    channel_name: channels_name_get_1.getChannelName,
    created_at: channels_created_at_get_1.getChannelCreatedAt,
    updated_at: channels_updated_at_get_1.getChannelUpdatedAt,
    members_count: channels_members_count_get_1.getChannelMembersCount,
    channel_type: channels_type_get_1.getChannelType,
    owner_id: channels_owner_get_1.getChannelOwnerID
};
