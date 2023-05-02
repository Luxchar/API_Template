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
exports.findUserBlocked = void 0;
const database_1 = __importDefault(require("../../../../database"));
const findUserBlocked = (user_id, blocked_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var User = yield database_1.default.users.find.id(user_id);
        var Blocked = yield database_1.default.users.find.id(blocked_id);
        if (!User || !Blocked)
            return false;
        if (!User.blocked)
            return false;
        if (User.blocked.includes(Blocked.user_id))
            return true;
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.findUserBlocked = findUserBlocked;
