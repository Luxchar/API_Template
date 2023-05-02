"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRouter = void 0;
const intercept_roles_1 = require("./intercept.roles");
exports.RolesRouter = {
    path: '/role',
    Create: {
        name: 'create',
        method: 'POST',
        path: '/create/:server_id',
        socketing: false,
        description: 'Create a role',
        params: ['token', 'server_id', 'role_name', 'role_color', 'role_position'],
        res: intercept_roles_1.RolesIntercept.create
    },
    Remove: {
        name: 'remove',
        method: 'GET',
        path: '/remove/:role_id',
        socketing: false,
        description: 'Remove a role',
        params: ['token', 'role_id'],
        res: intercept_roles_1.RolesIntercept.remove
    },
    Get: {
        name: 'get',
        method: 'GET',
        path: '/get/:role_id',
        socketing: false,
        description: 'Get a role',
        params: ['token', 'role_id'],
        res: intercept_roles_1.RolesIntercept.get
    }
};
