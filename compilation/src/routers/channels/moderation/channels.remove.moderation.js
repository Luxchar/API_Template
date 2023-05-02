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
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, member_id } = req.body;
        const { channel_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || !user_id || !member_id || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || user_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH ||
            member_id.length !== utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || member_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(channel_id)) || isNaN(parseInt(member_id)) || isNaN(parseInt(user_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id));
        if (!Channel)
            throw "Channel not found";
        var Member = yield database_1.default.users.find.id(member_id);
        if (!Member)
            throw "Member not found";
        if (Channel.server_id)
            throw "This is not a dm or group channel";
        if (Channel.members.indexOf(member_id) === -1)
            throw "Error with the provided id";
        if (Channel.members.indexOf(user_id) === -1)
            throw "Error with the provided id";
        if (Channel.owner_id !== user_id)
            throw "You are not the owner of this channel";
        if (Channel.owner_id === member_id)
            throw "You cannot kick yourself";
        Channel.members.splice(Channel.members.indexOf(member_id), 1);
        yield Channel.save();
        //update the member 
        var Member = yield database_1.default.users.find.id(member_id);
        if (!Member)
            throw "Member not found";
        if (Member.channels)
            Member.channels.splice(Member.channels.indexOf(parseInt(channel_id)), 1);
        yield Member.save();
        emitter_client_1.default.emit("channel_kick", {
            channel_id: channel_id,
            member_id: member_id,
            user_id: user_id
        });
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Member kicked"));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.remove = remove;
