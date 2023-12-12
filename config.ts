import dotenv from "dotenv";
dotenv.config();

const BASE_URI = process.env.BASE_URI;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const SQL_DATABASE = process.env.SQL_DATABASE
const SQL_HOST = process.env.SQL_HOST
const SQL_USERNAME = process.env.SQL_USERNAME
const SQL_PASSWORD = process.env.SQL_PASSWORD
const SQL_PORT = process.env.SQL_PORT

export const config = {
    application: {
        name: "Template API",
        version: "1.0.0",
        description: ` A 'simple' API Template in TypeScript.
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
        url: (process.env.MONGO_URL?.replace("<USERNAME>", MONGO_USERNAME!).replace("<PASSWORD>", MONGO_PASSWORD!).replace("<HOST>", MONGO_HOST!).replace("<DATABASE>", MONGO_DATABASE!))!,
    },
    sql: {
        database: SQL_DATABASE || "admin",
        host: SQL_HOST || "localhost",
        username: SQL_USERNAME || "admin",
        password: SQL_PASSWORD || "admin",
        port: Number(SQL_PORT) || 3306,
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