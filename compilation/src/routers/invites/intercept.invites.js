"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitesIntercept = void 0;
const invites_create_1 = require("./invites.create");
const invites_remove_1 = require("./invites.remove");
const invites_use_1 = require("./invites.use");
const invites_get_1 = require("./invites.get");
exports.InvitesIntercept = {
    create: invites_create_1.inviteCreate,
    remove: invites_remove_1.inviteRemove,
    use: invites_use_1.inviteUse,
    get: invites_get_1.inviteGet
};
