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
exports.send = void 0;
const controller_1 = require("../controller");
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const utils_1 = __importDefault(require("../../utils"));
const send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { channel_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || !message || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH) { //type check
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.error)
                .setMessage("Badly formatted"));
            return;
        }
        // Check if the user is banned
        // Check if the user is muted
        var User = yield utils_1.default.FUNCTIONS.find.user.token(token); // Find the user
        if (!User)
            throw "User not found";
        // check length of message
        if (User.premium) {
            if (message.length > utils_1.default.CONSTANTS.MESSAGE.PROPERTIES.MAX_MESSAGE_LENGTH_PREMIUM || message.length < utils_1.default.CONSTANTS.MESSAGE.PROPERTIES.MIN_MESSAGE_LENGTH)
                throw "Message is too long or too short";
        }
        else {
            if (message.length > utils_1.default.CONSTANTS.MESSAGE.PROPERTIES.MAX_MESSAGE_LENGTH || message.length < utils_1.default.CONSTANTS.MESSAGE.PROPERTIES.MIN_MESSAGE_LENGTH)
                throw "Message is too long or too short";
        }
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        // check if channel is a text channel
        if (Channel.channel_type == utils_1.default.CONSTANTS.CHANNEL.TYPE.VOICE)
            throw "Channel is not a text channel";
        // Check if the user has permission to send messages
        if (!utils_1.default.FUNCTIONS.PERMISSIONS.checkChannelPermissions(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.MESSAGE.SEND))
            throw "You do not have permission to send messages in this channel";
        logger_client_1.default.debug(`Sending message to channel ${Channel.channel_id}`);
        // Check if the user is in the channel
        if (!Channel.members.includes(User.user_id))
            throw "You are not in this channel";
        var Message = yield database_1.default.messages.create({
            message_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_id: parseInt(channel_id),
            user_id: User.user_id,
            message,
            created_at: new Date().toLocaleString(),
        });
        if (!Message)
            throw "Message not created";
        yield Message.save(); // Save the message to the database
        emitter_client_1.default.emit("sendMessage", Message); // Emit the message to the client
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Message sent`)
            .setData(Message));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.send = send;
