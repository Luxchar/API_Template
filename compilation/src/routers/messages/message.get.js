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
exports.get = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const utils_1 = __importDefault(require("../../utils"));
const database_1 = __importDefault(require("../../database"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message_id } = req.params;
        const token = req.token;
        if (!message_id || !token || !token ||
            message_id.length < utils_1.default.CONSTANTS.MESSAGE.ID.MIN_LENGTH || message_id.length > utils_1.default.CONSTANTS.MESSAGE.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(message_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Message = yield database_1.default.messages.find.id(message_id);
        if (!Message)
            throw "Message not found";
        //fetch channel 
        var Channel = yield database_1.default.channels.find.id(Message.channel_id);
        if (!Channel)
            throw "Channel not found";
        // check if user is in the channel
        if (!User.channels.includes(Channel.channel_id))
            throw "User is not in the channel";
        // fetch user's info
        var Author = yield database_1.default.users.find.id(Message.user_id);
        if (!Author)
            throw "Author not found";
        emitter_client_1.default.emit("getMessage", Message);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Message found`)
            .setData(Object.assign(Message, Author)));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.get = get;
