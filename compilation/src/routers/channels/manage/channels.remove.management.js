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
exports.removeChannel = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const removeChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(channel_id)))
            throw "Badly formatted";
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id)); // Find the channel
        if (!Channel)
            throw "Channel not found";
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found";
        if (User.user_id !== Channel.owner_id)
            throw "You are not the owner of this channel"; // Check if the user is the owner of the channel
        // check if the user has permission to update the channel
        if (!Channel.server_id)
            throw "Channel is not a server channel"; // only server channels can be deleted
        if (!utils_1.default.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN))
            throw "You do not have permission to delete this channel";
        // delete the channel
        Channel.deleteOne();
        // remove the channel from the members 
        for (let i = 0; i < Channel.members.length; i++) {
            const member_id = Channel.members[i];
            var Member = yield database_1.default.users.find.id(member_id);
            if (!Member)
                throw "Member not found";
            var channel_id_temp = Channel.channel_id; // temp variable to prevent error
            if (Member.channels && Channel) {
                Member.channels = Member.channels.filter((channel) => channel !== channel_id_temp);
            }
            yield Member.save();
        }
        emitter_client_1.default.emit("deleteChannel", Channel);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channel deleted`)
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.removeChannel = removeChannel;
