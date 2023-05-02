"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
module.exports = (command, args) => {
    logger_client_1.default.success("Exiting...");
    process.exit(0);
};
