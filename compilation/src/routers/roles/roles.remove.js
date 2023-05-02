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
exports.removeRole = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const removeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id_input } = req.body;
        const token = req.token;
        //type checking
        if (!role_id_input || !token || !token ||
            role_id_input < utils_1.default.CONSTANTS.ROLE.ID.MIN_LENGTH || role_id_input > utils_1.default.CONSTANTS.ROLE.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(role_id_input)))
            throw "Badly formatted";
        const role_id = parseInt(role_id_input); //type checking
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Role = yield database_1.default.roles.find.id(role_id);
        if (!Role)
            throw "Role not found";
        // check if user is in the server
        if (!User.servers.includes(Role.role_server_id))
            throw "User is not in the server";
        yield database_1.default.roles.remove(role_id_input);
        logger_client_1.default.debug(`Role ${Role} has been removed`);
        emitter_client_1.default.emit("removeRole", Role);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Role removed`)
            .setData(Role));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.removeRole = removeRole;
