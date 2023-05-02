"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitesRouter = void 0;
const intercept_invites_1 = require("./intercept.invites");
exports.InvitesRouter = {
    path: "/invites",
    create: {
        name: "createInvite",
        method: "POST",
        socketing: false,
        description: "Create an invite for a server",
        path: "/create/:server_id",
        params: ["token", "server_id", "uses", "expires_at"],
        res: intercept_invites_1.InvitesIntercept.create
    },
    remove: {
        name: "removeInvite",
        method: "GET",
        socketing: false,
        description: "Remove an invite",
        path: "/remove/:invite_id",
        params: ["token", "invite_id"],
        res: intercept_invites_1.InvitesIntercept.remove
    },
    use: {
        name: "useInvite",
        method: "GET",
        socketing: false,
        description: "Use an invite",
        path: "/use/:invite_id",
        params: ["token", "invite_id"],
        res: intercept_invites_1.InvitesIntercept.use
    },
    get: {
        name: "getInvite",
        method: "GET",
        socketing: false,
        description: "Get an invite",
        path: "/get/:invite_id",
        params: ["token", "invite_id"],
        res: intercept_invites_1.InvitesIntercept.get
    }
};
