"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intercept = void 0;
const errors_1 = require("../errors/");
const users_1 = require("../users");
exports.Intercept = {
    ROOT: {
        path: "/",
        API: {
            path: "api",
            V1: {
                path: "/v1",
                Users: users_1.UserRouter,
            },
        },
        // ERROR HANDLER OF WRONG ROUTES // PATH * ALWAYS AT THE END OF THE ROUTER OBJECT 
        Errors: {
            path: "*",
            E404: errors_1.ErrorRouter
        }
    }
};
