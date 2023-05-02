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
exports.remove = void 0;
const controller_1 = require("../controller");
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const utils_1 = __importDefault(require("../../utils"));
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id, message_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || !message_id || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            message_id.length < utils_1.default.CONSTANTS.MESSAGE.ID.MIN_LENGTH || message_id.length > utils_1.default.CONSTANTS.MESSAGE.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH) { //type check
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.error)
                .setMessage("Badly formatted"));
            return;
        }
        var User = yield utils_1.default.FUNCTIONS.find.user.token(token); // Find the user
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        if (Channel.server_id)
            throw "Channel is not a server channel";
        // check if channel is a text channel
        if (Channel.channel_type == utils_1.default.CONSTANTS.CHANNEL.TYPE.VOICE)
            throw "Channel is not a text channel";
        // Check if the user is in the channel
        if (!Channel.members.includes(User.user_id))
            throw "You are not in this channel";
        // Check if the message is not his own message
        var Message = yield database_1.default.messages.find.id(message_id);
        if (!Message)
            throw "Message not found";
        if (Message.user_id != User.user_id) { // If the message is not his own message
            if (!utils_1.default.FUNCTIONS.PERMISSIONS.checkChannelPermissions(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN))
                throw "You do not have permission to delete others messages in this channel";
        }
        logger_client_1.default.debug(`Deleting message from channel ${Channel}`);
        // Delete the message
        var Message = yield database_1.default.messages.find.id(message_id);
        if (!Message)
            throw "Message not found";
        yield Message.delete();
        emitter_client_1.default.emit("deleteMessage", Message);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Message deleted`)
            .setData(Message));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.remove = remove;
