"use strict";
// check whether the channel is a server channel, a private channel or a group channel
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChannelType = void 0;
const checkChannelType = (channel) => {
    if (channel.server_id)
        return 'server';
    if (channel.owner_id)
        return 'group';
    return 'private';
};
exports.checkChannelType = checkChannelType;
