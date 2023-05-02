import express from "express"
import { Intercept } from "./response.controller";
import { Server } from "http"
import bearerToken from "express-bearer-token";
import rateLimit from 'express-rate-limit'
import Emitter from "../../client/emitter.client"
import { config } from "../../config";
import Logger from "../../client/logger.client";
import DB_Connect from "../../database/connect.database";
import ServerSocket from "../../socket";
import UTILS from "../../utils";

export default class Controller { // This is the class that starts the server
    static app: express.Express;
    static port: number;
    static server: Server;
    static socket: ServerSocket;
    static rateLimiter = rateLimit({
        windowMs: UTILS.CONSTANTS.API.RATELIMIT.TIME, // 15 minutes
        max: UTILS.CONSTANTS.API.RATELIMIT.MAX_REQUEST, // limit each IP to 500 requests per windowMs
        standardHeaders: UTILS.CONSTANTS.API.RATELIMIT.STANDARD_REQUEST === 1 ? true : false,
        legacyHeaders: UTILS.CONSTANTS.API.RATELIMIT.LEGACY_HEADERS === 1 ? true : false,
    })
    
    constructor(){
        Controller.port = config.properties.port
        Controller.app = express()
        Controller.app.use(express.json()) // This is the middleware that parses the body of the request to JSON format
        Controller.app.use(bearerToken());
        Controller.app.use(Controller.rateLimiter)
        Controller.server = Controller.app.listen(Controller.port)
        Controller.start()
        Logger.success("Server started on port "+Controller.port)
    }

    public static logInfo = () => {
        // ${config.application.description}
        Logger.normal(`
        ${config.ascii.art}

        Version: ${config.api.version}
        Port: ${config.properties.port}
        `)
        // Owners: ${config.application.owners.join(", ")}

        
    }

    protected static iterate = (obj: any, name: string = "", path: string = "", socketing: boolean = false, description: string = "", params: string[] = []): void => { // This is the function that iterates through the routes
        let method = "GET"
        Object.keys(obj).forEach(key => {
            if(key === "method") method = obj[key].toUpperCase()
            if(key === "path") path += obj[key]
            if(key === "name") name = obj[key]
            if(key === "description") description = obj[key]
            if(key === "socketing") socketing = obj[key]
            if(key === "params")  params = obj[key]
            if (typeof obj[key] === 'object' && obj[key] !== null)
                this.iterate(obj[key], name, path, socketing, description, params)
             else if (typeof obj[key] === 'function'){
                // socketing ? Controller.socket.add(method, name, path, params, obj[key].socket) : null
                if(method === "POST") this.app.post(path,  obj[key])
                else this.app.get(path,  obj[key])
                if(path.includes("*")) path = "*" 
                console.log()
                Logger.info(`Route: [${method}] ${path} [SOCKET] ${socketing} ${Logger.trace(description ? `[DESC] ${description} [PARAMS] ${params.length > 0 ? params : "MISSING"}` : "NO SOCKET DESCRIPTION")}`)
            }
        })
    }

    protected static rules() { // This is the function that sets the API rules
        Controller.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Content-Type', 'application/json')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
                return res.status(200).json({})
            }
            next()
        })
    }

    public static start() { // This is the function that starts the server
        Logger.beautifulSpace()
        Logger.info("Starting server...")
        DB_Connect().then(() => {
            Controller.rules()
            Controller.socket = new ServerSocket(this.server)
            Controller.iterate(Intercept)
            Controller.socket.run()
            Emitter.emit("readyRoute", this)
            Logger.beautifulSpace()
            Controller.logInfo()
            Logger.beautifulSpace()
        })
    }
    public static reload(){ // This is the function that reloads the server
        Controller.server.close()
        Controller.server = Controller.app.listen(Controller.port)
        Controller.start()
    }
    public static stop(){ // This is the function that stops the server
        Controller.server.close()
    }
}
