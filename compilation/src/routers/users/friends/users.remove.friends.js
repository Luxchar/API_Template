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
exports.removeFriend = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id } = req.params;
        const token = req.token;
        // if token or friend_id badly formatted
        if (!token || !friend_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(friend_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        // Check if the friend is not added
        if (!User.friends.includes(friend_id)) { // If the friend is not added, check if the user has a friend request from the friend
            // Check if the user has a friend request from the friend
            if (User.friends_requests_received.includes(friend_id)) {
                // Remove the friend request from the user
                User.friends_requests_received.splice(User.friends_requests_received.indexOf(friend_id), 1);
                User.updated_at = new Date().toLocaleString();
                User.save();
                // update the friend
                var Friend = yield database_1.default.users.find.id(parseInt(friend_id));
                if (!Friend)
                    throw "Friend not found";
                if (Friend.friends_requests_sent)
                    Friend.friends_requests_sent.splice(Friend.friends_requests_sent.indexOf(Friend.user_id), 1);
                Friend.updated_at = new Date().toLocaleString();
                Friend.save();
                emitter_client_1.default.emit("removeFriend", User);
                res.json(new controller_1.RouteResponse()
                    .setStatus(controller_1.Status.success)
                    .setMessage(`Friend Request_received removed`)
                    .setData(User));
                return;
            }
            else if (User.friends_requests_sent.includes(friend_id)) { // Check if the user has sent a friend request to the friend
                // Remove the friend request from the user
                User.friends_requests_sent.splice(User.friends_requests_sent.indexOf(friend_id), 1);
                User.updated_at = new Date().toLocaleString();
                User.save();
                // update the friend
                var Friend = yield database_1.default.users.find.id(parseInt(friend_id));
                if (!Friend)
                    throw "Friend not found";
                if (Friend.friends_requests_received)
                    Friend.friends_requests_received.splice(Friend.friends_requests_received.indexOf(User.id.toString()), 1);
                Friend.updated_at = new Date().toLocaleString();
                Friend.save();
                emitter_client_1.default.emit("removeFriend", User);
                res.json(new controller_1.RouteResponse()
                    .setStatus(controller_1.Status.success)
                    .setMessage(`Friend Request_sent removed`)
                    .setData(User));
                return;
            }
            throw "Friend not found";
        }
        else { // If the friend is added, remove the friend from the user
            User.friends.splice(User.friends.indexOf(friend_id), 1);
            User.updated_at = new Date().toLocaleString();
            User.save();
            // update the friend
            var Friend = yield database_1.default.users.find.id(parseInt(friend_id));
            if (!Friend)
                throw "Friend not found";
            if (Friend.friends)
                Friend.friends.splice(Friend.friends.indexOf(User.id.toString()), 1);
            Friend.updated_at = new Date().toLocaleString();
            Friend.save();
            emitter_client_1.default.emit("removeFriend", User);
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.success)
                .setMessage(`Friend removed`)
                .setData(User));
        }
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.removeFriend = removeFriend;
