"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_controller_1 = __importDefault(require("../../routers/controller/router.controller"));
module.exports = (command, args) => {
    router_controller_1.default.logInfo();
};
