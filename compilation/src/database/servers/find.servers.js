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
exports.ServerFindMany = exports.ServerFindOne = void 0;
const Server_1 = __importDefault(require("../models/Server"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
function ServerFindOne(server_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Server_1.default.findOne({ server_id: server_id });
        }
        catch (err) {
            logger_client_1.default.error(err);
            return null;
        }
    });
}
exports.ServerFindOne = ServerFindOne;
function ServerFindMany(server_ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Server_1.default.find({ server_id: { $in: server_ids } });
        }
        catch (err) {
            logger_client_1.default.error(err);
            return null;
        }
    });
}
exports.ServerFindMany = ServerFindMany;
