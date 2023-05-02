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
exports.getChannelName = void 0;
const controller_1 = require("../../controller");
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const getChannelName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id } = req.params;
        const token = req.token;
        if (!token || !channel_id || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(channel_id)))
            throw "Badly formatted";
        const User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        const Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        // Check if user is in channel
        const UserInChannel = yield database_1.default.channels.find.userInChannel(User.id, Channel.id);
        if (!UserInChannel)
            throw "User not in channel";
        if (Channel.server_id) { // Check if user is in server if channel is part of a server
            const UserInServer = yield database_1.default.servers.find.userInServer(User.id, Channel.server_id);
            if (!UserInServer)
                throw "User not in server";
        }
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Channel found")
            .setData(Channel.channel_name));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getChannelName = getChannelName;
