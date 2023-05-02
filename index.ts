import Client, { IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import Controller from "./src/routers/controller/router.controller";

Client.on("serverReady", async (routes: Controller, database: IDatabase) => {
    Logger.success("Client ready")
})
