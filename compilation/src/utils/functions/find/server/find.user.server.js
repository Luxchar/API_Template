"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserInServer = void 0;
const findUserInServer = (user_id, Server) => {
    try {
        if (Server.members.length === 0)
            return false; // no members in server
        // get keys of all members in map array
        const keys = Object.keys(Server.members[0]);
        // check if user_id is in keys
        if (keys.includes(user_id.toString()))
            return true;
        return false;
    }
    catch (error) {
        throw error;
    }
};
exports.findUserInServer = findUserInServer;
