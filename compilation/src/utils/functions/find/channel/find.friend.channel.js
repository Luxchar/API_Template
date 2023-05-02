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
exports.findChannelFriend = void 0;
const index_1 = __importDefault(require("../../../index"));
const findChannelFriend = (User, Friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var Channel = User.channels; // Get the channel from the user
        var Channeltemp = null;
        if (!Channel)
            throw "Channel not found"; // If the channel is not found, throw an error
        for (var i = 0; i < Channel.length; i++) { // iterate through the channels and find the channel with the friend id
            Channeltemp = yield index_1.default.FUNCTIONS.FIND.CHANNEL.id(Channel[i]); // fetch the channel
            if (Channeltemp) { // check if the channel is a private channel
                if (Channeltemp.channel_type === index_1.default.CONSTANTS.CHANNEL.TYPE.HYBRID) {
                    if (Channeltemp.members.includes(Friend.user_id)) { // check if the channel has the friend id
                        return Channeltemp; // return the channel
                    }
                }
            }
        }
        if (!Channel)
            throw "Channel not found"; // If the channel is not found, throw an error
    }
    catch (error) {
        throw error; // Throw the error
    }
});
exports.findChannelFriend = findChannelFriend;
