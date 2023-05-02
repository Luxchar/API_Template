"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const socket_1 = __importDefault(require("../../socket"));
module.exports = (command, args) => {
    let validArgs = {
        "lookup": [
            "id",
            "token"
        ],
        "kick": [
            "id",
            "token"
        ],
        "ban": [
            "id",
            "token"
        ],
        "unban": [
            "id",
            "token"
        ],
        "socket": [
            "list",
            "get",
        ]
    };
    if (args.length === 0)
        return logger_client_1.default.error("This command requires arguments: " + Object.keys(validArgs).join(", "));
    switch (args[0]) {
        case "lookup":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to lookup");
            switch (args[1]) {
                case "user_id":
                    if (args.length < 3)
                        return logger_client_1.default.error("Specify a user to lookup");
                    database_1.default.users.find.id(parseInt(args[2])).then((user) => {
                        if (!user)
                            return logger_client_1.default.error("User not found with id: " + args[2]);
                        logger_client_1.default.normal("User found: ");
                        logger_client_1.default.normal(user.toJSON().toString());
                    });
                    break;
                case "token":
                    if (args.length < 3)
                        return logger_client_1.default.error("Specify a user to lookup");
                    database_1.default.users.find.token(args[2]).then((user) => {
                        if (!user)
                            return logger_client_1.default.error("User not found");
                        logger_client_1.default.normal("User found: " + user);
                    });
                    break;
                case "socket_id":
                    if (args.length < 3)
                        return logger_client_1.default.error("Specify a user to lookup");
                    socket_1.default.users[args[2]]
                        ? logger_client_1.default.normal("User found: " + JSON.stringify(socket_1.default.users[args[2]], null, 2))
                        : logger_client_1.default.error("User not found");
                    break;
                default:
                    logger_client_1.default.error("Invalid command");
                    break;
            }
            break;
        case "kick":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to kick");
            break;
        case "ban":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to ban");
            break;
        case "unban":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to unban");
            break;
        case "socket":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a socket command");
            switch (args[1]) {
                case "list":
                    logger_client_1.default.normal("Listing sockets...");
                    for (let socket in socket_1.default.users) {
                        logger_client_1.default.normal("Socket: \n\n" + JSON.stringify(socket, null, 4));
                    }
                    break;
                case "get":
                    if (args.length < 3)
                        return logger_client_1.default.error("Specify a socket to get");
                    if (socket_1.default.users[args[2]])
                        return logger_client_1.default.normal("Socket found: "), logger_client_1.default.normal(JSON.stringify(socket_1.default.users[args[2]], null, 4));
                    else
                        logger_client_1.default.error("Socket not found");
                    break;
            }
            break;
        default:
            logger_client_1.default.error("Invalid command");
            break;
    }
};
