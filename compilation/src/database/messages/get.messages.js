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
exports.MessageFindChannel = exports.MessageFindUser = exports.MessageFindOne = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
function MessageFindOne(message_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Message_1.default.findOne({ message_id: message_id });
        }
        catch (err) {
            logger_client_1.default.error(err);
        }
    });
}
exports.MessageFindOne = MessageFindOne;
function MessageFindUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Message_1.default.find({ user_id: user_id });
        }
        catch (err) {
            logger_client_1.default.error(err);
        }
    });
}
exports.MessageFindUser = MessageFindUser;
function MessageFindChannel(channel_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Message_1.default.find({ channel_id: channel_id });
        }
        catch (err) {
            logger_client_1.default.error(err);
        }
    });
}
exports.MessageFindChannel = MessageFindChannel;
