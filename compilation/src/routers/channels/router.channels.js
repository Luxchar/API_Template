"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsRouter = void 0;
const intercept_channels_1 = require("./intercept.channels");
exports.ChannelsRouter = {
    path: "/channel",
    Create: {
        path: "/create",
        Private: {
            name: "createPrivate",
            method: "GET",
            socketing: false,
            description: "Create a private channel",
            path: "/private/:friend_id",
            params: ["token", "friend_id"],
            res: intercept_channels_1.ChannelsIntercept.create.private
        },
        Group: {
            name: "createGroup",
            method: "GET",
            socketing: false,
            description: "Create a group channel",
            path: "/group/:friend_id_1/:friend_id_2",
            params: ["token", "friend_id_1", "friend_id_2"],
            res: intercept_channels_1.ChannelsIntercept.create.group
        },
        Server: {
            name: "createServer",
            method: "POST",
            socketing: false,
            description: "Create a server channel",
            path: "/server/:server_id",
            params: ["token", "server_id", "channel_name", "channel_type"],
            res: intercept_channels_1.ChannelsIntercept.create.server
        }
    },
    Delete: {
        name: "delete",
        method: "GET",
        socketing: false,
        description: "Delete a channel",
        path: "/remove/:channel_id",
        params: ["token", "channel_id"],
        res: intercept_channels_1.ChannelsIntercept.management.remove
    },
    Member: {
        path: "/member",
        Add: {
            name: "addMember",
            method: "GET",
            socketing: false,
            description: "Add a member to a group channel",
            path: "/add/:channel_id/:member_id",
            params: ["token", "channel_id", "member_id"],
            res: intercept_channels_1.ChannelsIntercept.member.join
        },
        Leave: {
            name: "leaveMember",
            method: "GET",
            socketing: false,
            description: "Leave a group channel",
            path: "/leave/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.member.leave
        }
    },
    update: {
        path: "/update",
        channel_name: {
            name: "updateChannel_name",
            method: "POST",
            socketing: false,
            description: "Update channel_name of a channel",
            path: "/channel_name/:channel_id/",
            params: ["token", "channel_id", "channel_name"],
            res: intercept_channels_1.ChannelsIntercept.update.channel_name
        },
        permissions: {
            name: "updatePermissions",
            method: "POST",
            socketing: false,
            description: "Update permissions of a channel",
            path: "/permissions/:channel_id",
            params: ["token", "channel_id", "permissions"],
            res: intercept_channels_1.ChannelsIntercept.update.permissions
        }
    },
    get: {
        path: "/get",
        Channel: {
            name: "getChannel",
            method: "GET",
            socketing: false,
            description: "Get a channel",
            path: "/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.channel
        },
        Owner_id: {
            name: "getOwner_id",
            method: "GET",
            socketing: false,
            description: "Get owner_id from a channel",
            path: "/owner_id/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.owner_id
        },
        Channel_name: {
            name: "getChannel_name",
            method: "GET",
            socketing: false,
            description: "Get channel_name from a channel",
            path: "/channel_name/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.channel_name
        },
        Channel_type: {
            name: "getChannel_type",
            method: "GET",
            socketing: false,
            description: "Get channel_type from a channel",
            path: "/channel_type/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.channel_type
        },
        Members: {
            name: "getMembers",
            method: "GET",
            socketing: false,
            description: "Get members from a channel",
            path: "/members/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.members
        },
        Members_count: {
            name: "getMembers_count",
            method: "GET",
            socketing: false,
            description: "Get members_count from a channel",
            path: "/members_count/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.members_count
        },
        Updated_at: {
            name: "getUpdated_at",
            method: "GET",
            socketing: false,
            description: "Get updated_at from a channel",
            path: "/updated_at/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.updated_at
        },
        Created_at: {
            name: "getCreated_at",
            method: "GET",
            socketing: false,
            description: "Get created_at from a channel",
            path: "/created_at/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.created_at
        },
        Permissions: {
            name: "getPermissions",
            method: "GET",
            socketing: false,
            description: "Get permissions from a channel",
            path: "/permissions/:channel_id",
            params: ["token", "channel_id"],
            res: intercept_channels_1.ChannelsIntercept.get.permissions
        },
        Messages: {
            name: "getMessages",
            method: "GET",
            socketing: false,
            description: "Get messages from a channel",
            path: "/messages/:channel_id/:limit",
            params: ["token", "channel_id", "limit"],
            res: intercept_channels_1.ChannelsIntercept.get.messages
        },
    },
};
