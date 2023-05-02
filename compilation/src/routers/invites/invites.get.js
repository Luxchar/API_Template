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
exports.inviteGet = void 0;
const controller_1 = require("../controller");
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const inviteGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { invite_id } = req.params;
        const token = req.token;
        if (!invite_id || !token || invite_id.length < utils_1.default.CONSTANTS.INVITE.ID.MIN_LENGTH || invite_id.length > utils_1.default.CONSTANTS.INVITE.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(invite_id)))
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Invite = yield database_1.default.invites.find.id(parseInt(invite_id));
        if (!Invite)
            throw "Invite not found";
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Invite found")
            .setData(Invite));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.inviteGet = inviteGet;
