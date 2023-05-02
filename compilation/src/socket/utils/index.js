"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const bearer_utils_1 = require("./bearer.utils");
const delete_utils_1 = __importDefault(require("./delete.utils"));
const token_utils_1 = require("./token.utils");
const verify_utils_1 = __importDefault(require("./verify.utils"));
exports.utils = {
    delete: delete_utils_1.default,
    verify: verify_utils_1.default,
    get: {
        token: token_utils_1.getSocketToken
    },
    set: {
        bearer: bearer_utils_1.setBearer
    }
};
