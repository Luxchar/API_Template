import { ErrorIntercept } from "./intercept.errors"

export const ErrorRouter = {
        path: "*",
        E404G: {
            method: "GET",
            path: "",
            res: ErrorIntercept.ERR404
        },
        E404P: {
            method: "POST",
            path: "",
            res: ErrorIntercept.ERR404
        },
}