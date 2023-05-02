"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersRouter = void 0;
const intercept_servers_1 = require("./intercept.servers");
exports.ServersRouter = {
    path: "/server",
    get: {
        path: "/get",
        Server: {
            name: "getServer",
            method: "GET",
            socketing: true,
            description: "Get a server",
            path: "/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.server
        },
        Server_name: {
            name: "getServerName",
            method: "GET",
            socketing: false,
            description: "Get a server name",
            path: "/name/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.server_name
        },
        Owner_id: {
            name: "getOwnerId",
            method: "GET",
            socketing: false,
            description: "Get a server owner id",
            path: "/owner_id/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.owner_id
        },
        Channels: {
            name: "getChannels",
            method: "GET",
            socketing: true,
            description: "Get channels of a server",
            path: "/channels/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.channels
        },
        Members: {
            name: "getMembers",
            method: "GET",
            socketing: true,
            description: "Get members of a server",
            path: "/members/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.members
        },
        Members_count: {
            name: "getMembersCount",
            method: "GET",
            socketing: false,
            description: "Get members count of a server",
            path: "/members_count/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.members_count
        },
        Updated_at: {
            name: "getUpdatedAt",
            method: "GET",
            socketing: false,
            description: "Get updated_at of a server",
            path: "/updated_at/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.updated_at
        },
        Created_at: {
            name: "getCreatedAt",
            method: "GET",
            socketing: false,
            description: "Get created_at of a server",
            path: "/created_at/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.created_at
        },
        Permissions_id: {
            name: "getPermissionsId",
            method: "GET",
            socketing: false,
            description: "Get permissions_id of a server",
            path: "/permissions_id/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.permissions
        },
        Server_icon: {
            name: "getServerIcon",
            method: "GET",
            socketing: false,
            description: "Get server_icon of a server",
            path: "/icon/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.get.server_icon
        }
    },
    update: {
        path: "/update",
        Server_name: {
            name: "updateServerName",
            method: "GET",
            socketing: true,
            description: "Update server name",
            path: "/name/:server_id/:name",
            params: ["token", "server_id", "server_name"],
            res: intercept_servers_1.ServerIntercept.update.name
        },
        Server_icon: {
            name: "updateServerIcon",
            method: "POST",
            socketing: true,
            description: "Update server icon",
            path: "/icon/:server_id",
            params: ["token", "server_id", "server_icon"],
            res: intercept_servers_1.ServerIntercept.update.icon
        },
        Channels: {
            name: "updateChannels",
            method: "GET",
            socketing: true,
            description: "Update channels order of a server",
            path: "/channels/:server_id/",
            params: ["token", "server_id", "new_channels_order"],
            res: intercept_servers_1.ServerIntercept.update.channels
        }
    },
    manage: {
        create: {
            name: "create",
            method: "GET",
            socketing: true,
            description: "Create a server",
            path: "/create/:name",
            params: ["token", "name"],
            res: intercept_servers_1.ServerIntercept.manage.create
        },
        remove: {
            name: "remove",
            method: "GET",
            socketing: true,
            description: "Remove a server",
            path: "/remove/:server_id",
            params: ["token", "server_id"],
            res: intercept_servers_1.ServerIntercept.manage.remove
        }
    },
};
