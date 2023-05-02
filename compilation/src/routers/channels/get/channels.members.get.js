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
exports.getMembers = void 0;
const controller_1 = require("../../controller");
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(channel_id)))
            throw "Badly formatted";
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        // Check if the user is in the channel
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        if (!Channel.members.includes(User.user_id))
            throw "You are not in this channel";
        logger_client_1.default.debug(`Getting members of channel ${Channel}`);
        // fetch the members of the channel
        var Members = yield database_1.default.users.find.many(Channel.members);
        if (!Members)
            throw "Members not found";
        // Remove private info
        const Members_Public_Info = Members.map((member) => utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(member));
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channel members`)
            .setData(Members_Public_Info));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getMembers = getMembers;
