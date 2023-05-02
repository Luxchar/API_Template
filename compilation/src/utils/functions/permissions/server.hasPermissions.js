"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasServerPermissions = void 0;
const hasServerPermissions = (user, server, permission) => {
    try {
        if (user.user_id === server.owner_id)
            return true; // If the user is the
        // fetch roles of user and test if they have the permission
        if (server.permissions) {
            if (server.permissions.admin.user_id.includes(user.user_id))
                return true; // If the user has an admin perm, return true
            if (server.permissions.admin.roles_id.includes(user.user_id))
                return true; // If the user has an admin perm, return true
            const serverPermissions = server.permissions; // Get the server permissions
            if (permission.length === 0) {
                if (serverPermissions[permission[0]].roles_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
                if (serverPermissions[permission[0]].user_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
            }
            else if (permission.length === 1) {
                if (serverPermissions[permission[0]][permission[1]].user_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
                if (serverPermissions[permission[0]][permission[1]].roles_id.includes(user.user_id))
                    return true; // If the user has the permission, return true
            }
        }
        return false;
    }
    catch (error) {
        throw error;
    }
};
exports.hasServerPermissions = hasServerPermissions;
