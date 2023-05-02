import Logger from "../../client/logger.client";
import DB from "../../database"
import ServerSocket from "../../socket";
module.exports = (command: string, args: Array<string>) => {
    let validArgs = {
        "lookup" : [
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
    }
    if(args.length === 0) return Logger.error("This command requires arguments: " + Object.keys(validArgs).join(", "))
    switch(args[0]) {
        case "lookup":
            if(args.length < 2) return Logger.error("Specify a user to lookup")
            switch(args[1]) {
                case "user_id":
                    if(args.length < 3) return Logger.error("Specify a user to lookup")
                    DB.users.find.id(parseInt(args[2])).then((user) => {
                        if(!user) return Logger.error("User not found with id: " + args[2])
                        Logger.normal("User found: ")
                        Logger.normal(user.toJSON().toString())
                    })
                    break;
                case "token":
                    if(args.length < 3) return Logger.error("Specify a user to lookup")
                    DB.users.find.token(args[2]).then((user) => {
                        if(!user) return Logger.error("User not found")
                        Logger.normal("User found: " + user)
                    })
                    break;
                case "socket_id":
                    if(args.length < 3) return Logger.error("Specify a user to lookup")
                    ServerSocket.users[args[2]]
                        ? Logger.normal("User found: " + JSON.stringify(ServerSocket.users[args[2]], null, 2))
                        : Logger.error("User not found")
                    break;
                default:
                    Logger.error("Invalid command")
                    break;
            }
            break;
        case "kick":
            if(args.length < 2) return Logger.error("Specify a user to kick")
            break;
        case "ban":
            if(args.length < 2) return Logger.error("Specify a user to ban")
            break;
        case "unban":
            if(args.length < 2) return Logger.error("Specify a user to unban")
            break;
        case "socket":
            if(args.length < 2) return Logger.error("Specify a socket command")
            switch(args[1]) {
                case "list":
                    Logger.normal("Listing sockets...")
                    for(let socket in ServerSocket.users) {
                        Logger.normal("Socket: \n\n" + JSON.stringify(socket, null, 4))
                    }
                    break;
                case "get":
                    if(args.length < 3) return Logger.error("Specify a socket to get")
                    if(ServerSocket.users[args[2]])
                        return Logger.normal("Socket found: "), Logger.normal(JSON.stringify(ServerSocket.users[args[2]], null, 4))
                    else Logger.error("Socket not found") 
                    break;
                }
            break;
        default:
            Logger.error("Invalid command")
            break;
    }
}