"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChannelPermissions = void 0;
const __1 = __importDefault(require("../.."));
const database_1 = __importDefault(require("../../../database"));
const hasChannelPermissions = (User, Channel, permissions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Channel.server_id) { // PERMISSIONS CHECK
            var Server = yield database_1.default.servers.find.id(Channel.server_id); // Find the server
            if (!Server)
                throw "Server not found"; // Check if the server exists
            if (__1.default.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, permissions) === false) { // check in server permissions
                if (checkChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                    return false;
                }
            }
        }
        else {
            if (checkChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                return false;
            }
        }
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.hasChannelPermissions = hasChannelPermissions;
const checkChannelPermission = (user, channel, permission) => {
    try {
        // Check if the user has the permission
        if (user.user_id === channel.owner_id)
            return true; // If the user is the owner of the channel, return true
        if (channel.permissions) {
            if (channel.permissions.admin.user_id.includes(user.user_id))
                return true; // If the user has an admin perm, return true
            if (channel.permissions.admin.roles_id.includes(user.user_id))
                return true; // If the user has an admin perm, return true
            const channelPermissions = channel.permissions; // Get the channel permissions
            if (permission.length === 0) {
                if (channelPermissions[permission[0]].roles_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
                if (channelPermissions[permission[0]].user_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
            }
            else if (permission.length === 1) {
                if (channelPermissions[permission[0]][permission[1]].user_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
                if (channelPermissions[permission[0]][permission[1]].roles_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
            }
        }
        return false;
    }
    catch (error) {
        throw error;
    }
};
