"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRouter = void 0;
const intercept_errors_1 = require("./intercept.errors");
exports.ErrorRouter = {
    path: "*",
    E404G: {
        method: "GET",
        path: "",
        res: intercept_errors_1.ErrorIntercept.ERR404
    },
    E404P: {
        method: "POST",
        path: "",
        res: intercept_errors_1.ErrorIntercept.ERR404
    },
};
