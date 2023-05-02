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
exports.UserFindByID = exports.UserFindByToken = exports.UserFindByUsername = exports.UserGetOne = exports.UserGetMany = void 0;
const User_1 = __importDefault(require("../models/User"));
function UserGetMany(array_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return User_1.default.find({ user_id: { $in: array_id } });
        }
        catch (err) {
            return null;
        }
    });
}
exports.UserGetMany = UserGetMany;
function UserGetOne(query, options = { projection: { _id: 0 } }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return User_1.default.findOne(query, options);
        }
        catch (err) {
            return null;
        }
    });
}
exports.UserGetOne = UserGetOne;
function UserFindByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return User_1.default.findOne({ username });
        }
        catch (err) {
            return null;
        }
    });
}
exports.UserFindByUsername = UserFindByUsername;
function UserFindByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return User_1.default.findOne({ token });
        }
        catch (err) {
            return null;
        }
    });
}
exports.UserFindByToken = UserFindByToken;
function UserFindByID(ID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return User_1.default.findOne({ user_id: ID });
        }
        catch (err) {
            return null;
        }
    });
}
exports.UserFindByID = UserFindByID;
