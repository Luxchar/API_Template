import Logger from "../../client/logger.client"
import Controller from "../../routers/controller/router.controller"

module.exports = (command: string, args: Array<string>) => {
    let validArgs = ["reload", "stop"]
    if(args.length === 0) return Logger.error("This command requires arguments: " + validArgs.join(", "))
    switch(args[0]) {
        case "reload":
            Logger.normal("Reloading routes...")
            Controller.reload()
            break;
        case "stop":
            Logger.normal("Stopping server...")
            Controller.stop()
            break;
        default:
            Logger.error("Invalid command")
            break;
    }
}