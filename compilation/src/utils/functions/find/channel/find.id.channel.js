"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChannelID = void 0;
const database_1 = __importDefault(require("../../../../database"));
const findChannelID = (channelID) => {
    try {
        var Channel = database_1.default.channels.find.id(channelID); // Find the channel in the database
        if (!Channel)
            throw "Channel not found"; // If the channel is not found, throw an error
        return Channel; // Return the channel
    }
    catch (error) {
        throw error; // Throw the error
    }
};
exports.findChannelID = findChannelID;
