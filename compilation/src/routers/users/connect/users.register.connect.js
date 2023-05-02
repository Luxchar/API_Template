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
exports.userRegister = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../../../utils"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // if username or password badly formatted
        if (!username || !password || username.length >= utils_1.default.CONSTANTS.USER.USERNAME.MAX_LENGTH || username.length <= utils_1.default.CONSTANTS.USER.USERNAME.MIN_LENGTH ||
            password.length >= utils_1.default.CONSTANTS.USER.PASSWORD.MAX_LENGTH || password.length <= utils_1.default.CONSTANTS.USER.PASSWORD.MIN_LENGTH)
            throw "Badly formatted";
        var user = yield database_1.default.users.find.username(username);
        if (user)
            throw "User already exists";
        const user_id = Date.now() + Math.floor(Math.random() * 1000);
        var User = yield database_1.default.users.create({
            username: username,
            password: yield bcrypt_1.default.hash(password, 10),
            premium_expiration: new Date().toLocaleString(),
            token: ((0, uuid_1.v5)(username, (0, uuid_1.v4)()).split("-").join("") + Date.now()).toUpperCase(),
            user_id: user_id,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString(),
            discriminator: utils_1.default.BASE[36](user_id),
        });
        if (!User)
            throw "Failed to create user";
        // create a channel where there only is the user
        var Channel = yield database_1.default.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: utils_1.default.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_category: "DM",
            channel_name: "Me",
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            // add the user to the channel members
            members: [User.user_id],
            members_count: 1,
            permissions: utils_1.default.CONSTANTS.PERMISSIONS.SOLO(User)
        });
        if (!Channel)
            throw "Channel not found";
        User.channels = [Channel.channel_id];
        User.save();
        emitter_client_1.default.emit("register", User);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Successfully register")
            .setData(User));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.userRegister = userRegister;
