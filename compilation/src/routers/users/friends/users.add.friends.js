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
exports.addFriend = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id } = req.params;
        const token = req.token;
        if (!token || !friend_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(friend_id)))
            throw "Badly formatted";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token); // Find the user
        if (!User)
            throw "User not found";
        // Check if the friend is already added
        if (User.friends.includes(friend_id))
            throw "User already added";
        // Check if the friend is already requested
        if (User.friends_requests_sent.includes(friend_id))
            throw "User already requested";
        // Check if the friend is already blocked
        if (User.blocked.includes(friend_id))
            throw "User is blocked";
        //Check if the friend exists
        var Friend = yield utils_1.default.FUNCTIONS.FIND.USER.id(parseInt(friend_id));
        // Check if the user is itself
        if (User.user_id.toString() === friend_id)
            throw "User is itself";
        if (Friend.blocked) { // Check if user is already blocked by the friend in the database
            if (Friend.blocked.includes(User.id.toString()))
                throw "User is blocked";
        }
        if (Friend.friends_requests_received) { // Check if user is already requested by the friend
            if (Friend.friends_requests_received.includes(User.id.toString()))
                throw "User already requested";
        }
        // DATABASE UPDATES
        if (User.friends_requests_received.includes(friend_id)) { // If the user has a friend request from the friend, accept it and remove the request from the friend
            User.friends_requests_received.splice(User.friends_requests_received.indexOf(friend_id), 1); // Remove the request from the user
            if (Friend.friends_requests_received) { // this check is useless but it's here to avoid errors
                Friend.friends_requests_received.splice(Friend.friends_requests_received.indexOf(User.user_id.toString()), 1); // remove the request from the friend 
            }
            // Add the user to the friend
            if (Friend.friends) {
                Friend.friends.push(User.user_id);
            }
            else {
                Friend.friends = [User.user_id];
            }
            // Add the friend to the user
            if (User.friends) {
                User.friends.push(Friend.user_id);
            }
            else {
                User.friends = [Friend.user_id];
            }
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
                channel_category: "DM",
                members_count: 2,
                permissions: utils_1.default.CONSTANTS.PERMISSIONS.PRIVATE(User, Friend)
            });
            if (!Channel)
                throw "Channel not created";
            // Save the user
            if (User.channels) {
                User.channels.push(Channel.channel_id);
            }
            else {
                User.channels = [Channel.channel_id];
            }
            User.updated_at = new Date().toLocaleString();
            User.save();
            // Save the user
            if (Friend.channels) {
                Friend.channels.push(Channel.channel_id);
            }
            else {
                Friend.channels = [Channel.channel_id];
            }
            Friend.updated_at = new Date().toLocaleString();
            Friend.save();
            // Emit the event
            emitter_client_1.default.emit("addFriend", Friend);
            // cut sensitive data
            const Friend_Public_Info = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Friend.toObject()); // cut sensitive data and convert to object to avoid errors with mongoose
            // Send the response
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.success)
                .setMessage(`Friend added`)
                .setData(Friend_Public_Info));
        }
        else { // If the user doesn't have a friend request from the friend, send a request to the friend 
            // Add the user to the friend
            if (Friend.friends_requests_received) {
                Friend.friends_requests_received.push(User.user_id);
            }
            else {
                Friend.friends_requests_received = [User.user_id];
            }
            // Add the friend to the user
            if (User.friends_requests_sent) {
                User.friends_requests_sent.push(Friend.user_id);
            }
            else {
                User.friends_requests_sent = [Friend.user_id];
            }
            // update the friend
            Friend.updated_at = new Date().toLocaleString();
            Friend.save();
            // update the user 
            User.updated_at = new Date().toLocaleString();
            User.save();
            // Emit the event
            emitter_client_1.default.emit("addFriend", Friend);
            const Friend_Public_Info = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Friend.toObject()); // cut sensitive data and convert to object to avoid errors with mongoose
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.success)
                .setMessage(`Friend request sent`)
                .setData(Friend_Public_Info));
        }
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.addFriend = addFriend;
