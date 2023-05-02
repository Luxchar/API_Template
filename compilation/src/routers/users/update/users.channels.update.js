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
exports.channelsUpdate = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const channelsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newchannels } = req.body;
        const token = req.token;
        // if token or newchannels badly formatted
        if (!token || !newchannels || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newchannels.length > utils_1.default.CONSTANTS.USER.CHANNELS.MAX_LENGTH || newchannels.length < utils_1.default.CONSTANTS.USER.CHANNELS.MIN_LENGTH)
            throw "Badly formatted";
        // if user not found
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        // check if the channels are all in User.channels (if not the user could add a channel that he doesn't have access to)
        for (var i = 0; i < newchannels.length; i++) {
            if (!User.channels.includes(newchannels[i]))
                throw "Badly formatted";
        }
        User.channels = newchannels;
        User.updated_at = new Date().toLocaleString();
        yield User.save();
        emitter_client_1.default.emit("updateChannels", User);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channels updated`)
            .setData(User));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.channelsUpdate = channelsUpdate;
