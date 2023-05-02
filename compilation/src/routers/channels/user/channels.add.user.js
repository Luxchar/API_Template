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
exports.join = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const join = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_id, user_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || !user_id || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH
            || user_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(channel_id)) || isNaN(parseInt(user_id)))
            throw "Badly formatted";
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id)); // Find the channel
        if (!Channel)
            throw "Channel not found"; // Check if the channel exists
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found"; // Check if the user exists
        if (Channel.server_id)
            throw "This is not a dm or group channel";
        if (User.user_id !== Channel.owner_id)
            throw "You are not the owner of this channel"; // Check if the user is the owner of the channel
        var UserToAdd = yield database_1.default.users.find.id(parseInt(user_id)); // Find the user to add
        if (!UserToAdd)
            throw "User to add not found"; // Check if the user to add exists
        if (Channel.members.includes(UserToAdd.user_id))
            throw "User is already in this channel"; // Check if the user is already in the channel
        // Check if the user has permission to update the channel 
        if (!utils_1.default.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.MEMBER.INVITE))
            throw "You do not have permission to update this channel";
        if (!Channel.members)
            Channel.members = []; // Check if the channel has members
        Channel.members.push(UserToAdd.user_id); // Add the user to the channel
        Channel.members_count = Channel.members.length;
        Channel.updated_at = Date.toLocaleString();
        yield Channel.save(); // Save the channel
        if (!UserToAdd.channels)
            UserToAdd.channels = []; // Check if the user has channels
        UserToAdd.channels.push(Channel.channel_id); // Add the channel to the user
        yield UserToAdd.save(); // Save the user
        emitter_client_1.default.emit("addUserToChannel", Channel, UserToAdd);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`User added to channel`)
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.join = join;
