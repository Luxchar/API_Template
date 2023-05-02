import Logger from "../../client/logger.client";

module.exports = (command: string, args: string) => {
    Logger.success("Exiting...");
    process.exit(0);
}