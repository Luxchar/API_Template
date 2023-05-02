"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_controller_1 = require("./response.controller");
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const config_1 = require("../../config");
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const connect_database_1 = __importDefault(require("../../database/connect.database"));
const socket_1 = __importDefault(require("../../socket"));
const utils_1 = __importDefault(require("../../utils"));
class Controller {
    constructor() {
        Controller.port = config_1.config.properties.port;
        Controller.app = (0, express_1.default)();
        Controller.app.use(express_1.default.json()); // This is the middleware that parses the body of the request to JSON format
        Controller.app.use((0, express_bearer_token_1.default)());
        Controller.app.use(Controller.rateLimiter);
        Controller.server = Controller.app.listen(Controller.port);
        Controller.start();
        logger_client_1.default.success("Server started on port " + Controller.port);
    }
    static rules() {
        Controller.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
                return res.status(200).json({});
            }
            next();
        });
    }
    static start() {
        logger_client_1.default.beautifulSpace();
        logger_client_1.default.info("Starting server...");
        (0, connect_database_1.default)().then(() => {
            Controller.rules();
            Controller.socket = new socket_1.default(this.server);
            Controller.iterate(response_controller_1.Intercept);
            Controller.socket.run();
            emitter_client_1.default.emit("readyRoute", this);
            logger_client_1.default.beautifulSpace();
            Controller.logInfo();
            logger_client_1.default.beautifulSpace();
        });
    }
    static reload() {
        Controller.server.close();
        Controller.server = Controller.app.listen(Controller.port);
        Controller.start();
    }
    static stop() {
        Controller.server.close();
    }
}
_a = Controller;
Controller.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: utils_1.default.CONSTANTS.API.RATELIMIT.TIME,
    max: utils_1.default.CONSTANTS.API.RATELIMIT.MAX_REQUEST,
    standardHeaders: utils_1.default.CONSTANTS.API.RATELIMIT.STANDARD_REQUEST === 1 ? true : false,
    legacyHeaders: utils_1.default.CONSTANTS.API.RATELIMIT.LEGACY_HEADERS === 1 ? true : false,
});
Controller.logInfo = () => {
    // ${config.application.description}
    logger_client_1.default.normal(`
        ${config_1.config.ascii.art}

        Version: ${config_1.config.api.version}
        Port: ${config_1.config.properties.port}
        `);
    // Owners: ${config.application.owners.join(", ")}
};
Controller.iterate = (obj, name = "", path = "", socketing = false, description = "", params = []) => {
    let method = "GET";
    Object.keys(obj).forEach(key => {
        if (key === "method")
            method = obj[key].toUpperCase();
        if (key === "path")
            path += obj[key];
        if (key === "name")
            name = obj[key];
        if (key === "description")
            description = obj[key];
        if (key === "socketing")
            socketing = obj[key];
        if (key === "params")
            params = obj[key];
        if (typeof obj[key] === 'object' && obj[key] !== null)
            _a.iterate(obj[key], name, path, socketing, description, params);
        else if (typeof obj[key] === 'function') {
            // socketing ? Controller.socket.add(method, name, path, params, obj[key].socket) : null
            if (method === "POST")
                _a.app.post(path, obj[key]);
            else
                _a.app.get(path, obj[key]);
            if (path.includes("*"))
                path = "*";
            console.log();
            logger_client_1.default.info(`Route: [${method}] ${path} [SOCKET] ${socketing} ${logger_client_1.default.trace(description ? `[DESC] ${description} [PARAMS] ${params.length > 0 ? params : "MISSING"}` : "NO SOCKET DESCRIPTION")}`);
        }
    });
};
exports.default = Controller;
