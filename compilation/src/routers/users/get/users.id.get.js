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
exports.getUserbyID = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const utils_1 = __importDefault(require("../../../utils"));
const getUserbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const token = req.token;
        // if token or user_id badly formatted
        if (!token || !user_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || !utils_1.default.CONSTANTS.USER.ID)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (User) { // if user token is valid
            if (User.id == parseInt(user_id)) {
                res.status(200);
                res.json(new controller_1.RouteResponse()
                    .setStatus(controller_1.Status.success)
                    .setMessage(`User found`)
                    .setData(User));
                return;
            }
        }
        throw "User not found";
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getUserbyID = getUserbyID;
