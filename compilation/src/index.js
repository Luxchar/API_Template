"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emitter_client_1 = __importDefault(require("./client/emitter.client"));
const config_1 = require("./config");
const database_1 = __importDefault(require("./database"));
const router_controller_1 = __importDefault(require("./routers/controller/router.controller"));
require("./console");
__exportStar(require("./routers"), exports);
__exportStar(require("./config"), exports);
__exportStar(require("./client"), exports);
__exportStar(require("./database"), exports);
__exportStar(require("./socket"), exports);
exports.default = emitter_client_1.default;
setTimeout(() => {
    // HANDLE DATABASE HERE (MONGOOSE) -> NEED TO BE DONE BEFORE READY EVENT // TO FIX
    emitter_client_1.default.emit("ready", new router_controller_1.default(), database_1.default);
}, config_1.config.properties.readyEventTimeout);
