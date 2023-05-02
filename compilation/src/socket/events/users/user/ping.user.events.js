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
exports.PingEvent = void 0;
const __1 = __importDefault(require("../../.."));
const logger_client_1 = __importDefault(require("../../../../client/logger.client"));
class PingEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(user_id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let user in __1.default.users) {
                    if (__1.default.users[user].user_id == user_id) {
                        __1.default.io.to(user).emit("pingUser", message);
                    }
                }
            }
            catch (error) {
                logger_client_1.default.error(error);
            }
        });
    }
}
exports.PingEvent = PingEvent;
