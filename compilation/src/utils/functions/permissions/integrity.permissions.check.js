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
exports.checkIntegrity = void 0;
const __1 = __importDefault(require("../.."));
const checkIntegrity = (permissions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PERMISSIONS = __1.default.CONSTANTS.CHANNEL.PERMISSIONS.ALL;
        const keys = Object.keys(permissions);
        if (keys.length !== PERMISSIONS.length)
            return false;
        for (let i = 0; i < keys.length; i++) {
            if (!PERMISSIONS.includes(keys[i]))
                return false;
            const permission = permissions[keys[i]];
            const permissionKeys = Object.keys(permission);
            for (let j = 0; j < permissionKeys.length; j++) {
                if (!["roles_id", "user_id"].includes(permissionKeys[j]))
                    return false;
                if (!Array.isArray(permission[permissionKeys[j]]))
                    return false;
                for (let k = 0; k < permission[permissionKeys[j]].length; k++) {
                    if (typeof permission[permissionKeys[j]][k] !== "number")
                        return false;
                }
            }
        }
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.checkIntegrity = checkIntegrity;
