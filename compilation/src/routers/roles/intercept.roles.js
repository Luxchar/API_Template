"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesIntercept = void 0;
const roles_create_1 = require("./roles.create");
const roles_remove_1 = require("./roles.remove");
const roles_get_1 = require("./roles.get");
// import * from "./roles.update";
exports.RolesIntercept = {
    create: roles_create_1.createRole,
    remove: roles_remove_1.removeRole,
    get: roles_get_1.getRole,
};
