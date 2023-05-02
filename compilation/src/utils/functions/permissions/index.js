"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
const channel_hasPermissions_1 = require("./channel.hasPermissions");
const server_hasPermissions_1 = require("./server.hasPermissions");
const integrity_permissions_check_1 = require("./integrity.permissions.check");
const role_color_check_1 = require("./role.color.check");
exports.PERMISSIONS = {
    hasChannelPermissions: channel_hasPermissions_1.hasChannelPermissions,
    hasServerPermissions: server_hasPermissions_1.hasServerPermissions,
    checkIntegrity: integrity_permissions_check_1.checkIntegrity,
    checkRoleColor: role_color_check_1.checkRoleColor
};
