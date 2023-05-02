"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.FriendAddEvent = void 0;
const axios_1 = __importStar(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../../utils");
const utils_2 = __importDefault(require("../../../../utils"));
const __1 = __importDefault(require("../../.."));
const logger_client_1 = __importDefault(require("../../../../client/logger.client"));
dotenv_1.default.config();
class FriendAddEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(friendID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${process.env.BASE_URI}/api/v1/client/friends/add/${friendID}`, utils_1.utils.set.bearer(__1.default.users[this.socket.id].token));
                if (!response.data)
                    return __1.default.io.to(this.socket.id).emit("friendAdd", null);
                if (!response.data.data)
                    return __1.default.io.to(this.socket.id).emit("friendAdd", null);
                logger_client_1.default.debug("Friend add event from " + response.data.data);
                for (let user in __1.default.users) {
                    console.log(__1.default.users[user].user_id + " " + friendID);
                    if (__1.default.users[user].user_id == friendID) {
                        console.log("Friend request sent to " + __1.default.users[user].user_id);
                        __1.default.io.to(user).emit("friendRequestsReceived", utils_2.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(__1.default.users[this.socket.id]));
                        console.log(utils_2.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(__1.default.users[this.socket.id]));
                    }
                }
                return __1.default.io.to(this.socket.id).emit("friendAdd", response.data.data);
            }
            catch (err) {
                if (err instanceof axios_1.AxiosError)
                    console.log("Error adding friend to user ", (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            }
        });
    }
}
exports.FriendAddEvent = FriendAddEvent;
