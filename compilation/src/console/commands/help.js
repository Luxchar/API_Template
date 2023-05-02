"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
logger_client_1.default.beautifulSpace();
module.exports = (command, args) => {
    helpMessage.forEach((item) => {
        logger_client_1.default.normal(`\t${item.name}\t\t${item.description}`);
    });
};
const helpMessage = [
    {
        name: "help",
        description: "Show all commands",
    },
    {
        name: "exit",
        description: "Exit the console",
    },
    {
        name: "clear",
        description: "Clear the console",
    },
    {
        name: "routes",
        description: "Manage routes",
    },
    {
        name: "execute",
        description: "Execute code or commands",
    },
    {
        name: "info",
        description: "Show info about the application",
    }
];
