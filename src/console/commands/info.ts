import Logger from "../../client/logger.client"
import { config } from "../../config"
import Controller from "../../routers/controller/router.controller"

module.exports = (command: string, args: string) => {
    Controller.logInfo()
}