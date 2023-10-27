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
const User_1 = __importDefault(require("../../../database/models/User"));
const logger_1 = __importDefault(require("../../../logger"));
exports.default = {
    name: "/user/auth/connect",
    description: "Connect a user",
    method: "POST",
    run: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get the token from the request header
            const token = req.headers["authorization"]; // the token is in the authorization header
            // const token = req.body.token; // the token is in the request body
            // if token or user_id badly formatted
            if (!token)
                throw "Badly formatted";
            var user = yield User_1.default.findOne({ token: token });
            if (user) { // if user token is valid
                logger_1.default.info(`User ${user.username} has been logged in !`);
                res.status(200);
                res.send(user);
            }
            throw "An error occured";
        }
        catch (err) {
            res.status(400);
            res.send("An error occured");
        }
    })
};
