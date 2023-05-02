import Logger from "../../client/logger.client";
import { IHelpMessage } from "../interface";


Logger.beautifulSpace()

module.exports =  (command: string, args: string) => {
    helpMessage.forEach((item) => {
        Logger.normal(`\t${item.name}\t\t${item.description}`)
})}

    const helpMessage: Array<IHelpMessage> = [
        {
            name: "help",
            description: "Show all commands",
        },
        {
            name: "exit",
            description: "Exit the console",
        },
        {
            name: "clear",
            description: "Clear the console",
        },
        {
            name: "routes",
            description: "Manage routes",
        },
        {
            name: "execute",
            description: "Execute code or commands",
        },
        {
            name: "info",
            description: "Show info about the application",
        }
    ]
