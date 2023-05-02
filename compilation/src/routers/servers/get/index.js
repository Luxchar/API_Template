"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const servers_get_1 = require("./servers.get");
const servers_channels_get_1 = require("./servers.channels.get");
const servers_members_get_1 = require("./servers.members.get");
const servers_permissions_get_1 = require("./servers.permissions.get");
const servers_created_at_get_1 = require("./servers.created_at.get");
const servers_updated_at_get_1 = require("./servers.updated_at.get");
const servers_members_count_get_1 = require("./servers.members_count.get");
const servers_name_get_1 = require("./servers.name.get");
const servers_owner_get_1 = require("./servers.owner.get");
const servers_icon_get_1 = require("./servers.icon.get");
exports.get = {
    server: servers_get_1.getServer,
    channels: servers_channels_get_1.getChannels,
    members: servers_members_get_1.getMembers,
    permissions: servers_permissions_get_1.getPermissions,
    created_at: servers_created_at_get_1.getCreatedAt,
    updated_at: servers_updated_at_get_1.getUpdatedAt,
    members_count: servers_members_count_get_1.getMembersCount,
    server_name: servers_name_get_1.getServerName,
    owner_id: servers_owner_get_1.getOwner,
    server_icon: servers_icon_get_1.getServerIcon
};
