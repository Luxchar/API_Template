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
exports.InviteRemove = void 0;
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const Invite_1 = __importDefault(require("../models/Invite"));
const InviteRemove = (invite_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return Invite_1.default.deleteOne({ invite_id: invite_id }); // Remove invite
    }
    catch (err) {
        logger_client_1.default.error(err);
    }
});
exports.InviteRemove = InviteRemove;
