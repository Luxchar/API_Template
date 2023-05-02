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
exports.findServer = void 0;
const database_1 = __importDefault(require("../../../../database"));
// Find server by server_id and return server object if found or throw error if not found
function findServer(server_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var Server = yield database_1.default.servers.find.id(server_id); // Find server in database
            if (!Server)
                throw "Server not found"; // If server is not found, throw an error
            return Server; // Return server
        }
        catch (error) {
            throw error; // Throw error
        }
    });
}
exports.findServer = findServer;
