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
exports.create_group = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const create_group = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id_1, friend_id_2 } = req.params;
        const token = req.token;
        if (!token || !friend_id_1 || !friend_id_2 ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id_1.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_1.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH ||
            friend_id_2.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_2.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(friend_id_1)) || isNaN(parseInt(friend_id_2)))
            throw "Badly formatted";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token);
        var Friend_1 = yield utils_1.default.FUNCTIONS.FIND.USER.id(parseInt(friend_id_1));
        var Friend_2 = yield utils_1.default.FUNCTIONS.FIND.USER.id(parseInt(friend_id_2));
        if (User.channels.length >= utils_1.default.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS)
            throw "You have reached the maximum number of private channels";
        var Channel = yield database_1.default.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: utils_1.default.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_name: User.username + " and " + Friend_1.username + " and " + Friend_2.username,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            channel_category: "GROUP",
            members: [User.user_id, Friend_1.user_id, Friend_2.user_id],
            members_count: 3,
            owner_id: User.user_id,
            permissions: utils_1.default.CONSTANTS.PERMISSIONS.GROUP(User, Friend_1, Friend_2)
        });
        if (!Channel)
            throw "Failed to create channel";
        User.channels.push(Channel.channel_id); // save the channel id to the user
        yield User.save(); // Save the user
        if (!Friend_1.channels)
            Friend_1.channels = []; // this should never happen but typesafe..
        Friend_1.channels.push(Channel.channel_id);
        yield Friend_1.save();
        if (!Friend_2.channels)
            Friend_2.channels = [];
        Friend_2.channels.push(Channel.channel_id);
        yield Friend_2.save();
        emitter_client_1.default.emit("channel.create", Channel); // Emit the event to the client
        emitter_client_1.default.emit("channel.join", Channel, User);
        emitter_client_1.default.emit("channel.join", Channel, Friend_1);
        emitter_client_1.default.emit("channel.join", Channel, Friend_2);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Channel created")
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
        return;
    }
});
exports.create_group = create_group;
