"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const channels_name_update_1 = require("./channels.name.update");
const channels_permissions_update_1 = require("./channels.permissions.update");
exports.update = {
    channel_name: channels_name_update_1.updateName,
    permissions: channels_permissions_update_1.updatePermissions
};
