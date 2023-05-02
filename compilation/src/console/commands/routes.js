"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const router_controller_1 = __importDefault(require("../../routers/controller/router.controller"));
module.exports = (command, args) => {
    let validArgs = ["reload", "stop"];
    if (args.length === 0)
        return logger_client_1.default.error("This command requires arguments: " + validArgs.join(", "));
    switch (args[0]) {
        case "reload":
            logger_client_1.default.normal("Reloading routes...");
            router_controller_1.default.reload();
            break;
        case "stop":
            logger_client_1.default.normal("Stopping server...");
            router_controller_1.default.stop();
            break;
        default:
            logger_client_1.default.error("Invalid command");
            break;
    }
};
