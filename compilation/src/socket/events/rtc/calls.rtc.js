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
exports.CallEvent = void 0;
const __1 = __importDefault(require("../.."));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const { RTCPeerConnection } = require("wrtc");
class CallEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(candidate_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.socket.id)
                    throw new Error("Socket not found");
                logger_client_1.default.debug("Call user " + candidate_id + " from " + this.socket.id);
                var candidate = null;
                for (let user in __1.default.users) {
                    if (__1.default.users[user].user_id == candidate_id) {
                        candidate = __1.default.users[user];
                    }
                }
                if (candidate == null)
                    throw new Error("Candidate not found");
                const rtc = new RTCPeerConnection();
                console.log(rtc);
                rtc.onicecandidate = (event) => {
                    if (event.candidate) {
                        __1.default.io.to([this.socket.id, candidate.id]).emit("iceCandidate", event.candidate);
                        logger_client_1.default.debug("Send iceCandidate to " + candidate.id);
                    }
                };
                rtc.oniceconnectionstatechange = () => {
                    if (rtc.iceConnectionState === "disconnected") {
                        __1.default.io.to([this.socket.id, candidate.id]).emit("iceDisconnected");
                        logger_client_1.default.debug("Send iceDisconnected to " + candidate.id);
                    }
                };
                rtc.ontrack = (event) => {
                    __1.default.io.to([this.socket.id, candidate.id]).emit("track", event.track);
                };
                rtc.onnegotiationneeded = (event) => {
                    rtc.createOffer().then((offer) => {
                        rtc.setLocalDescription(offer);
                        __1.default.io.to([this.socket.id, candidate.id]).emit("negotiationNeeded", offer);
                        logger_client_1.default.debug("Send negotiationNeeded to " + candidate.id);
                    });
                };
            }
            catch (err) {
                logger_client_1.default.error(err);
            }
        });
    }
}
exports.CallEvent = CallEvent;
