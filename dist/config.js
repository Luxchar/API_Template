"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URI = process.env.BASE_URI;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
exports.config = {
    application: {
        name: "Template API",
        version: "1.0.0",
        description: ` A simple API Template in TypeScript.
        `,
        owners: [
            ""
        ],
    },
    properties: {
        port: Number(process.env.APP_PORT) || 3000,
        readyEventTimeout: 500,
    },
    mongo: {
        username: MONGO_USERNAME,
        url: ((_a = process.env.MONGO_URL) === null || _a === void 0 ? void 0 : _a.replace("<USERNAME>", MONGO_USERNAME).replace("<PASSWORD>", MONGO_PASSWORD)),
    },
    api: {
        url: BASE_URI,
        version: "1.0.0",
    },
    ascii: {
        art: `
         _    ____ ___ 
        / \  |  _ \_ _|
       / _ \ | |_) | | 
      / ___ \|  __/| | 
     /_/   \_\_|  |___|                                                                             
        `
    }
};
