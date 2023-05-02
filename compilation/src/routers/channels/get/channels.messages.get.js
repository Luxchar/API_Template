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
exports.getMessages = void 0;
const controller_1 = require("../../controller");
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id, limit } = req.params;
        const token = req.token;
        if (!token || !channel_id || !limit || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            limit.length > utils_1.default.CONSTANTS.SERVER.MESSAGE.MAX_FETCH_LIMIT || limit.length < utils_1.default.CONSTANTS.SERVER.MESSAGE.MIN_FETCH_LIMIT || isNaN(parseInt(channel_id)))
            throw "Badly formatted";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token);
        if (!User)
            throw "User not found";
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        if (!Channel.members.includes(User.user_id))
            throw "You are not a member of this channel";
        var Messages = yield database_1.default.channels.find.messages(channel_id, parseInt(limit));
        if (!Messages)
            throw "Messages not found";
        // fetch user's info
        var Authors = yield database_1.default.users.find.many(Messages.map(message => message.user_id));
        if (!Authors)
            throw "Authors not found";
        var BuiltMessages = [];
        // replace user_id with user object
        for (var message of Messages) {
            var Author = Authors.find(author => author.user_id == message.user_id);
            if (!Author)
                throw "Author not found";
            BuiltMessages.push({ message, author: utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Author) });
        }
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channel messages`)
            .setData(BuiltMessages));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getMessages = getMessages;
