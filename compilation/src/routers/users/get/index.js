"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const users_token_get_1 = require("./users.token.get");
const users_id_get_1 = require("./users.id.get");
const users_username_get_1 = require("./users.username.get");
const users_updated_at_get_1 = require("./users.updated_at.get");
const users_created_at_get_1 = require("./users.created_at.get");
exports.get = {
    UserbyToken: users_token_get_1.getUserbyToken,
    UserbyID: users_id_get_1.getUserbyID,
    Username: users_username_get_1.getUsername,
    UpdatedAt: users_updated_at_get_1.getUpdatedAt,
    CreatedAt: users_created_at_get_1.getCreatedAt,
};
