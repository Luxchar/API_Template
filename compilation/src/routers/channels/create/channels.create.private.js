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
exports.create_private = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const create_private = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id } = req.params;
        const token = req.token;
        if (!token || !friend_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(friend_id)))
            throw "Badly formatted";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token);
        var Friend = yield utils_1.default.FUNCTIONS.FIND.USER.id(parseInt(friend_id));
        if (User.channels.length >= utils_1.default.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS)
            throw "You have reached the maximum number of private channels";
        // check if friend is blocked by user or user is blocked by friend 
        if (yield utils_1.default.FUNCTIONS.FIND.USER.blocked(User.user_id, Friend.user_id))
            throw "Friend is blocked";
        if (yield utils_1.default.FUNCTIONS.FIND.USER.blocked(Friend.user_id, User.user_id))
            throw "You are blocked";
        //if friend has message_privacy set to everyone or friends only
        if (Friend.message_privacy === utils_1.default.CONSTANTS.MESSAGE.PROPERTIES.MESSAGE_PRIVACY_FRIENDS) {
            if (!utils_1.default.FUNCTIONS.FIND.USER.friend(User, Friend))
                throw "Friend not found";
        }
        if (User.user_id === Friend.user_id)
            throw "You cannot create a private channel with yourself";
        // check if channel already exists between users 
        var Channel_Exists = yield utils_1.default.FUNCTIONS.FIND.CHANNEL.friend(User, Friend);
        if (Channel_Exists)
            throw "Channel already exists";
        // create channel
        var Channel = yield database_1.default.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: utils_1.default.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_name: User.username + " and " + Friend.username,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            members: [User.user_id, Friend.user_id],
            channel_category: "SERVER",
            members_count: 2,
            permissions: utils_1.default.CONSTANTS.PERMISSIONS.PRIVATE(User, Friend)
        });
        if (!Channel)
            throw "Channel not created";
        yield Channel.save();
        // add channel to user
        User.channels.push(Channel.channel_id);
        yield User.save();
        // add channel to friend
        if (Friend.channels)
            Friend.channels.push(Channel.channel_id);
        else
            Friend.channels = [Channel.channel_id];
        yield Friend.save();
        // send channel to user and friend
        emitter_client_1.default.emit("channelCreatePrivate", {
            user_id: User.user_id,
            friend_id: Friend.user_id,
            channel: Channel
        });
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Private channel created")
            .setData({ channel: Channel }));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
        return;
    }
});
exports.create_private = create_private;
