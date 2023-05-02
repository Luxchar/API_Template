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
exports.passwordUpdate = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = __importDefault(require("../../../utils"));
const uuid_1 = require("uuid");
const passwordUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newpassword } = req.body;
        const token = req.token;
        // if token or newpassword badly formatted
        if (!token || !newpassword || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newpassword.length >= utils_1.default.CONSTANTS.USER.PASSWORD.MAX_LENGTH || newpassword.length <= utils_1.default.CONSTANTS.USER.PASSWORD.MIN_LENGTH)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        User.token = ((0, uuid_1.v5)(User.username + Date.now(), (0, uuid_1.v4)()).split("-").join("") + Date.now()).toUpperCase(); // generate a new token
        User.password = yield bcrypt_1.default.hash(newpassword, 10);
        User.updated_at = new Date().toLocaleString();
        yield User.save();
        emitter_client_1.default.emit("updatePassword", User);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Password updated`)
            .setData(User));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.passwordUpdate = passwordUpdate;
