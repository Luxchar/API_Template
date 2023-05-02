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
exports.create = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { name } = req.params;
        const token = req.token;
        if (!name || !token || name.length < utils_1.default.CONSTANTS.SERVER.NAME.MIN_LENGTH || name.length > utils_1.default.CONSTANTS.SERVER.NAME.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found";
        if (User.servers.length >= utils_1.default.CONSTANTS.USER.MAX_SERVERS)
            throw "You have reached the max amount of servers";
        // create the server
        var Server = yield database_1.default.servers.create({
            server_id: Date.now() + Math.floor(Math.random() * 1000),
            server_name: name,
            owner_id: parseInt(User.user_id),
            channels: [],
            members: [new Map([[String(User.user_id), []]])],
            members_count: 1,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            roles: []
        });
        if (!Server)
            throw "Failed to create server";
        yield Server.save(); // Save the server to the database
        // add the server to the user
        User.servers.push(Server.server_id);
        yield User.save();
        emitter_client_1.default.emit("createServer", Server);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Server created"));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.create = create;
