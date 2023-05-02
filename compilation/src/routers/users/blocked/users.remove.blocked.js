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
exports.removeBlocked = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const removeBlocked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blocked_id } = req.params;
        const token = req.token;
        // if token or blocked_id badly formatted
        if (!token || !blocked_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            blocked_id.length < utils_1.default.CONSTANTS.USER.ID.MIN_LENGTH || blocked_id.length > utils_1.default.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(blocked_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "Invalid token";
        // check if the user is already blocked
        if (!User.blocked.includes(blocked_id))
            throw "User not blocked";
        // remove the blocked user from the user
        User.blocked.splice(User.blocked.indexOf(blocked_id), 1);
        User.updated_at = new Date().toLocaleString();
        User.save();
        emitter_client_1.default.emit("removeBlocked", User);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Blocked removed`)
            .setData(User));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.removeBlocked = removeBlocked;
