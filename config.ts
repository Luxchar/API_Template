import dotenv from "dotenv";
dotenv.config();

const BASE_URI = process.env.BASE_URI;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const config = { // This is the config file for the application.
    application: {
        name: "Template API",
        version: "1.0.0",
        description: ` A simple API Template in TypeScript.
        `,
        owners : [
            ""
        ],
    }, 

    properties : {
        port: Number(process.env.APP_PORT) || 3000,
        readyEventTimeout: 500,
    },
    mongo: {
        username: MONGO_USERNAME,
        url: (process.env.MONGO_URL?.replace("<USERNAME>", MONGO_USERNAME!).replace("<PASSWORD>", MONGO_PASSWORD!))!,
    },
    api : {
        url : BASE_URI,
        version : "1.0.0",
    },
    ascii: {
        art: `
         _    ____ ___ 
        / \  |  _ \_ _|
       / _ \ | |_) | | 
      / ___ \|  __/| | 
     /_/   \_\_|  |___|                                                                             
        `
    }
}