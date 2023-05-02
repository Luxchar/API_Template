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
exports.create_server = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const create_server = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_name, channel_type } = req.body;
        const { server_id } = req.params;
        const token = req.token;
        if (!token || !server_id || !channel_name || !channel_type ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            server_id.length !== utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            channel_name.length < utils_1.default.CONSTANTS.CHANNEL.NAME.MIN_LENGTH || channel_name.length > utils_1.default.CONSTANTS.CHANNEL.NAME.MAX_LENGTH ||
            channel_type == utils_1.default.CONSTANTS.CHANNEL.TYPE.TEXT || channel_type == utils_1.default.CONSTANTS.CHANNEL.TYPE.VOICE || isNaN(parseInt(server_id)))
            throw "Badly formatted";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token);
        var Server = yield utils_1.default.FUNCTIONS.FIND.SERVER.id(parseInt(server_id));
        logger_client_1.default.log("Creating server channel for " + User.username + " in " + channel_name);
        if (User.channels.length >= utils_1.default.CONSTANTS.CHANNEL.MAX_SERVER_CHANNELS)
            throw "You have reached the maximum number of server channels";
        // create channel
        var Channel = yield database_1.default.channels.create({
            server_id: parseInt(server_id),
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: channel_type,
            channel_name: channel_name,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            members: [User.user_id],
            members_count: 1,
            channel_category: "SERVER",
            permissions: utils_1.default.CONSTANTS.PERMISSIONS.SERVER(User)
        });
        if (!Channel)
            throw "Could not create channel";
        yield Channel.save();
        // add channel to server
        if (Server.channels)
            Server.channels.push(Channel.channel_id);
        else
            Server.channels = [Channel.channel_id];
        yield Server.save();
        logger_client_1.default.log("Created server channel for " + User.username + " in " + Server.server_name);
        // send event to client to update channels list in sidebar
        emitter_client_1.default.emit("update_channels", {
            server_id: Server.server_id,
            channels: Server.channels
        });
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Channel created")
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
        return;
    }
});
exports.create_server = create_server;
