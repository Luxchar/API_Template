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
exports.userKick = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const userKick = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { server_id, user_id } = req.params;
        const token = req.token;
        if (!server_id || !user_id || !token || server_id.length < utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            user_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(server_id)) || isNaN(parseInt(user_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found";
        var Server = yield database_1.default.servers.find.id(parseInt(server_id)); // Find the server
        if (!Server)
            throw "Server not found";
        // Check if user is a member of the server
        if (!utils_1.default.FUNCTIONS.FIND.SERVER.member(User.user_id, Server))
            throw "You are not a member of this server";
        // check if user_id is in Server.members
        if (!utils_1.default.FUNCTIONS.FIND.SERVER.member(parseInt(user_id), Server))
            throw "User is not a member of this server";
        // check permissions of user
        if (!utils_1.default.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, utils_1.default.CONSTANTS.SERVER.PERMISSIONS.ADMIN))
            throw "You do not have permission to kick users";
        // remove the user from the server members array of maps
        delete Server.members[parseInt(user_id)];
        emitter_client_1.default.emit("updateKick", Server);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("User kicked"));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.userKick = userKick;
