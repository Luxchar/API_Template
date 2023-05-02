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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFriendbyUser = void 0;
const findFriendbyUser = (User, Friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!User.friends)
            throw "Friend not found";
        if (User.friends.includes(Friend.user_id))
            return true;
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.findFriendbyUser = findFriendbyUser;
