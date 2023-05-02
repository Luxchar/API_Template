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
exports.findUserbyToken = void 0;
const database_1 = __importDefault(require("../../../../database"));
const findUserbyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var User = yield database_1.default.users.find.token(token); // Find the user in the database
        if (!User)
            throw "User not found"; // If the user is not found, throw an error
        return User; // Return the user
    }
    catch (error) {
        throw error; // Throw the error
    }
});
exports.findUserbyToken = findUserbyToken;
