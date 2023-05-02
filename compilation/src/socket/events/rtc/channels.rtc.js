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
exports.ChannelRTCEvent = void 0;
const __1 = __importDefault(require("../.."));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
class ChannelRTCEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(channel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.socket.id)
                    throw new Error("Socket not found");
                const rtc = new RTCPeerConnection();
                rtc.onicecandidate = (event) => {
                    if (event.candidate) {
                        __1.default.io.to(channel_id.toString()).emit("iceCandidate", event.candidate);
                    }
                };
                rtc.oniceconnectionstatechange = (event) => {
                    if (rtc.iceConnectionState === "disconnected") {
                        __1.default.io.to(this.socket.id).emit("iceDisconnected");
                    }
                };
                rtc.ontrack = (event) => {
                    __1.default.io.to(this.socket.id).emit("track", event.track);
                };
                rtc.onnegotiationneeded = (event) => {
                    rtc.createOffer().then((offer) => {
                        rtc.setLocalDescription(offer);
                        __1.default.io.to(this.socket.id).emit("negotiationNeeded", offer);
                    });
                };
            }
            catch (err) {
                logger_client_1.default.error(err);
            }
        });
    }
}
exports.ChannelRTCEvent = ChannelRTCEvent;
