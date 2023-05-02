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
exports.userConnect = void 0;
const database_1 = __importDefault(require("../../../database"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const userConnect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.token;
        // if username or password badly formatted
        if (!token || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH)
            throw "Badly formatted";
        logger_client_1.default.info(`User with token ${token} is connecting`);
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "Invalid token";
        logger_client_1.default.info(`User ${User.username} is connected`);
        User.last_connection = new Date().toLocaleString();
        User.save(); //update the last connection date of the user in the database
        // fetch the user's friends info from the database
        User.friends = yield database_1.default.users.find.many(User.friends);
        for (let i = 0; i < User.friends.length; i++) {
            User.friends[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends[i]);
        }
        User.friends_requests_sent = yield database_1.default.users.find.many(User.friends_requests_sent);
        for (let i = 0; i < User.friends_requests_sent.length; i++) {
            User.friends_requests_sent[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends_requests_sent[i]);
        }
        User.friends_requests_received = yield database_1.default.users.find.many(User.friends_requests_received);
        for (let i = 0; i < User.friends_requests_received.length; i++) {
            User.friends_requests_received[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends_requests_received[i]);
        }
        User.channels = yield database_1.default.channels.find.many(User.channels);
        for (let i = 0; i < User.channels.length; i++) {
            User.channels[i] = User.channels[i];
        }
        emitter_client_1.default.emit("connect", User, null);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Successfully connect to the user ${User.username}`)
            .setData(User));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.userConnect = userConnect;
