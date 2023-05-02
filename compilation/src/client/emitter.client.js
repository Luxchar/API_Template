"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEmitter = void 0;
const events_1 = require("events");
events_1.EventEmitter.defaultMaxListeners = 200;
class ClientEmitter extends events_1.EventEmitter {
    constructor() {
        super();
    }
}
exports.ClientEmitter = ClientEmitter;
exports.default = new ClientEmitter; // Global Event Emitter
