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
exports.LoginEvent = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = __importDefault(require("../.."));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const utils_2 = require("../../utils");
class LoginEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.socket.id)
                    throw new Error("Socket not found");
                logger_client_1.default.debug("Login event from " + this.socket.id);
                const User = (yield axios_1.default.get(`${process.env.BASE_URI}/api/v1/client/connect`, utils_2.utils.set.bearer(token))).data; // Get user data from API
                if (!User)
                    return __1.default.io.to(this.socket.id).emit("login", null), this.socket.disconnect(true); // Send null to client if user not found
                __1.default.users[this.socket.id] = User.data;
                __1.default.users[this.socket.id].channels.forEach((channel) => __awaiter(this, void 0, void 0, function* () {
                    this.socket.join(channel.channel_id.toString()); // Join all channels the user is in (convert channel id to string using toString())
                    logger_client_1.default.debug("Joining channel " + channel.channel_id);
                    var members = yield database_1.default.users.find.many(channel.members);
                    if (members) {
                        for (let i = 0; i < channel.members_count; i++) {
                            channel.members[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(members[i]);
                        }
                    }
                }));
                if (__1.default.users[this.socket.id].servers) {
                    this.socket.join(__1.default.users[this.socket.id].servers.map(String)); // Join all channels the user is in (convert channel id to string using map)
                }
                return __1.default.io.to(this.socket.id).emit("login", User.data); // Send user data to client
            }
            catch (_a) {
                logger_client_1.default.warn("User not found");
                return __1.default.io.to(this.socket.id).emit("login", null), this.socket.disconnect(true); // Send null to client if user not found 
            }
        });
    }
}
exports.LoginEvent = LoginEvent;
