import Logger from "../../client/logger.client"

module.exports = (command: string, args: Array<string>) => {
    let validArgs = ["code"]
    if(args.length === 0) return Logger.error("This command requires arguments: " + validArgs.join(", "))
    console.log(args[0])
    switch(args[0]) {
        case "code":
            Logger.normal("Executing code...")
            eval(args.slice(1).join(" "))
            break;
        default:
            Logger.error("Invalid command")
            break;
    }
}