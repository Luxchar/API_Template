"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PROPERTIES = void 0;
const PASSWORD_1 = require("./PASSWORD");
const PROFILE_PICTURE_1 = require("./PROFILE_PICTURE");
const TOKEN_1 = require("./TOKEN");
const USERNAME_1 = require("./USERNAME");
const ID_1 = require("./ID");
class USER_PROPERTIES {
}
USER_PROPERTIES.PASSWORD = PASSWORD_1.PASSWORD;
USER_PROPERTIES.USERNAME = USERNAME_1.USERNAME;
USER_PROPERTIES.TOKEN = TOKEN_1.TOKEN;
USER_PROPERTIES.PROFILE_PICTURE = PROFILE_PICTURE_1.PROFILE_PICTURE;
USER_PROPERTIES.ID = ID_1.ID;
USER_PROPERTIES.MAX_SERVERS = 100;
USER_PROPERTIES.CHANNELS = {
    MAX_LENGTH: 100,
    MIN_LENGTH: 0
};
USER_PROPERTIES.SERVERS = {
    MAX_LENGTH: 100,
    MIN_LENGTH: 0
};
USER_PROPERTIES.STATUS = ["online", "idle", "dnd", "offline"];
exports.USER_PROPERTIES = USER_PROPERTIES;