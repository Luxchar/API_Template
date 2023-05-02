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
exports.UserConnect = void 0;
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const get_users_1 = require("./get.users");
const bcrypt_1 = __importDefault(require("bcrypt"));
function UserConnect({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield (0, get_users_1.UserGetOne)({ username });
            if (userFound ? 'password' in userFound : false) {
                if (yield bcrypt_1.default.compare(password, userFound.password)) {
                    return true;
                }
            }
        }
        catch (error) {
            logger_client_1.default.error(error);
        }
        return false;
    });
}
exports.UserConnect = UserConnect;
