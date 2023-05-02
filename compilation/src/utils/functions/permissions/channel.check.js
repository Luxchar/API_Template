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
exports.checkChannelPermissions = void 0;
const __1 = __importDefault(require("../.."));
const database_1 = __importDefault(require("../../../database"));
const checkChannelPermissions = (User, Channel, permissions) => __awaiter(void 0, void 0, void 0, function* () {
    if (Channel.server_id) { // PERMISSIONS CHECK
        var Server = yield database_1.default.servers.find.id(Channel.server_id); // Find the server
        if (!Server)
            throw "Server not found"; // Check if the server exists
        if (__1.default.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, permissions) === false) { // check in server permissions
            if (__1.default.FUNCTIONS.PERMISSIONS.hasChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                return false;
            }
        }
    }
    else {
        if (__1.default.FUNCTIONS.PERMISSIONS.hasChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
            return false;
        }
    }
    return true;
});
exports.checkChannelPermissions = checkChannelPermissions;
