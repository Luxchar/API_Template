"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteIntercept = void 0;
const intercept_errors_1 = require("../errors/intercept.errors");
const intercept_users_1 = require("../users/intercept.users");
const intercept_channels_1 = require("../channels/intercept.channels");
const intercept_servers_1 = require("../servers/intercept.servers");
const intercept_messages_1 = require("../messages/intercept.messages");
const intercept_roles_1 = require("../roles/intercept.roles");
exports.RouteIntercept = {
    UserIntercept: intercept_users_1.UserIntercept,
    ChannelsIntercept: intercept_channels_1.ChannelsIntercept,
    ServerIntercept: intercept_servers_1.ServerIntercept,
    MessagesIntercept: intercept_messages_1.MessagesIntercept,
    ErrorIntercept: intercept_errors_1.ErrorIntercept,
    RolesIntercept: intercept_roles_1.RolesIntercept
};
