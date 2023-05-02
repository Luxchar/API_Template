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
exports.getFriends = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const utils_1 = __importDefault(require("../../../utils"));
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.token;
        // if token badly formatted
        if (!token || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        // fetch the user's info from the database
        User.friends = yield database_1.default.users.find.many(User.friends);
        for (let i = 0; i < User.friends.length; i++) {
            User.friends[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends[i]);
        }
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`User found`)
            .setData(User.friends));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getFriends = getFriends;
