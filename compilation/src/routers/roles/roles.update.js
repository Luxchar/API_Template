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
exports.updateRole = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id, name, color, position } = req.body;
        const permissions = req.body.permissions;
        const token = req.token;
        //type checking
        if (!token || !name || !role_id || !permissions || !color ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(role_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Role = yield database_1.default.roles.find.id(role_id);
        if (!Role)
            throw "Role not found";
        var Server = yield database_1.default.servers.find.id(Role.role_server_id);
        if (!Server)
            throw "Server not found";
        // check if user is in server
        if (!Server.members.includes(User.user_id))
            throw "User not in server";
        // check if user has permission to create role
        if (!utils_1.default.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, utils_1.default.CONSTANTS.SERVER.PERMISSIONS.ROLES.MANAGE))
            throw "User does not have permission to create role";
        // check that position is not already taken
        var Roles = yield database_1.default.roles.find.server_id(Server.server_id);
        if (!Roles)
            throw "No roles found";
        Roles.forEach((role) => __awaiter(void 0, void 0, void 0, function* () {
            if (role.role_position >= position) {
                role.role_position++;
                role.updated_at = new Date().toString();
                yield role.save();
            }
        }));
        // check that role color is valid hex color code
        if (!utils_1.default.FUNCTIONS.CHECK.ROLE.COLOR(color))
            throw "Invalid color";
        yield database_1.default.roles.update(role_id, name, color, permissions);
        emitter_client_1.default.emit("updateRole", Role);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Role updated`)
            .setData(Role));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.updateRole = updateRole;
