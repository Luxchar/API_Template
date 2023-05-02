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
exports.SocketEvents = void 0;
const login_events_1 = require("./connect/login.events");
const messages_1 = require("./messages");
const __1 = __importDefault(require(".."));
const channels_1 = require("./channels");
const user_1 = require("./users/user");
const friends_1 = require("./users/friends");
const roles_1 = require("./roles");
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const rtc_1 = require("./rtc");
const blocked_1 = require("./users/blocked");
const friends_2 = require("./users/friends");
class SocketEvents {
    constructor(socket) {
        this.socket = socket;
    }
    userGet() {
        const user = new user_1.UserGetEvent(this.socket);
        user.run();
    }
    disconnect() {
        delete __1.default.users[this.socket.id];
        logger_client_1.default.debug("User disconnected from " + this.socket.id);
    }
    kickUser(user_id) {
        const user = this.getUserByID(user_id);
        return;
    }
    callUser(candidate_id) {
        const call = new rtc_1.CallEvent(this.socket);
        call.run(candidate_id);
    }
    callChannel(channel_id) {
        const call = new rtc_1.ChannelRTCEvent(this.socket);
        call.run(channel_id);
    }
    userActivity() {
        const activity = new user_1.ActivityEvent(this.socket);
        activity.run();
    }
    roleCreate() {
        const roleCreate = new roles_1.RoleCreateEvent(this.socket);
        //roleCreate.run();
    }
    getUserByID(user_id) {
        for (let user in __1.default.users) {
            if (__1.default.users[user].user_id == user_id) {
                return user;
            }
        }
        return null;
    }
    getUserByToken(token) {
        for (let user in __1.default.users) {
            if (__1.default.users[user].token == token) {
                return user;
            }
        }
        return null;
    }
    getUserBySocketID(socket_id) {
        return __1.default.users[socket_id];
    }
    roleDelete(roleID) {
        const roleDelete = new roles_1.RoleDeleteEvent(this.socket);
        roleDelete.run(roleID);
    }
    roleGet(roleID) {
        const roleGet = new roles_1.RoleGetEvent(this.socket);
        roleGet.run(roleID);
    }
    channelCreate(friendID) {
        const channelCreate = new channels_1.ChannelPrivateCreateEvent(this.socket);
        channelCreate.run(friendID);
    }
    channelDelete(channelID) {
        const channelDelete = new channels_1.ChannelDeleteChannel(this.socket);
        channelDelete.run(channelID);
    }
    channelsGet() {
        const channelsGet = new channels_1.ChannelsGetEvent(this.socket);
        channelsGet.run();
    }
    pingUser(user_id, message) {
        const ping = new user_1.PingEvent(this.socket);
        ping.run(user_id, message);
    }
    messageCreate(channelID, message) {
        const messageCreate = new messages_1.MessageCreateEvent(this.socket);
        messageCreate.run(channelID, message);
    }
    messageDelete(channelID, messageID) {
        const messageDelete = new messages_1.MessageDeleteEvent(this.socket);
        messageDelete.run(channelID, messageID);
    }
    messageGet(channelID) {
        const messageGet = new messages_1.MessageGetEvent(this.socket);
        messageGet.run(channelID);
    }
    friendAdd(friendID) {
        const friendAdd = new friends_1.FriendAddEvent(this.socket);
        friendAdd.run(friendID);
    }
    friendRemove(friendID) {
        const friendRemove = new friends_1.FriendRemoveEvent(this.socket);
        friendRemove.run(friendID);
    }
    friendsRequestsReceived() {
        const friendsRequestsReceived = new friends_1.FriendRequestsReceivedEvent(this.socket);
        friendsRequestsReceived.run();
    }
    userBlockedAdd(userID) {
        const userBlockedAdd = new blocked_1.BlockedAddEvent(this.socket);
        userBlockedAdd.run(userID);
    }
    userBlockedRemove(userID) {
        const userBlockedRemove = new blocked_1.BlockedRemoveEvent(this.socket);
        userBlockedRemove.run(userID);
    }
    login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const Login = new login_events_1.LoginEvent(this.socket);
            Login.run(token);
        });
    }
    friendGetRequestsReceived() {
        return __awaiter(this, void 0, void 0, function* () {
            const Friends = new friends_2.FriendGetRequestsReceivedEvent(this.socket);
            Friends.run();
        });
    }
    friendGet() {
        return __awaiter(this, void 0, void 0, function* () {
            const Friends = new friends_2.FriendGetEvent(this.socket);
            Friends.run();
        });
    }
    get SocketUsers() {
        return __1.default.users;
    }
}
exports.SocketEvents = SocketEvents;
