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
exports.updateName = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const updateName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel_name } = req.body;
        const { channel_id } = req.params;
        const token = req.token;
        if (!channel_id || !token || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            channel_name.length >= utils_1.default.CONSTANTS.CHANNEL.NAME.MAX_LENGTH || channel_name.length < utils_1.default.CONSTANTS.CHANNEL.NAME.MIN_LENGTH || isNaN(parseInt(channel_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found"; // Check if the user exists
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id)); // Find the channel
        if (!Channel)
            throw "Channel not found"; // Check if the channel exists
        // Check if the user has permission to update the channel 
        if (!utils_1.default.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN))
            throw "You do not have permission to update this channel";
        Channel.channel_name = channel_name; // Update the channel name
        Channel.updated_at = Date.toLocaleString();
        yield Channel.save(); // Save the channel
        emitter_client_1.default.emit("updateChannel", Channel);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channel updated`)
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.updateName = updateName;
