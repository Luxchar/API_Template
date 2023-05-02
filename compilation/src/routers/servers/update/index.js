"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const servers_icon_update_1 = require("./servers.icon.update");
const servers_name_update_1 = require("./servers.name.update");
const servers_channels_update_1 = require("./servers.channels.update");
exports.update = {
    icon: servers_icon_update_1.iconUpdate,
    name: servers_name_update_1.nameUpdate,
    channels: servers_channels_update_1.channelsUpdate
};
