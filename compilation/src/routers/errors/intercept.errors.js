"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorIntercept = void 0;
const controller_1 = require("../controller");
exports.ErrorIntercept = {
    ERR404: (_, response) => {
        try {
            if (response != null)
                response.status(404);
            response == null ? new Error("Unauthorized function manipulation") :
                response.json(new controller_1.RouteResponse()
                    .setStatus(controller_1.Status.error)
                    .setMessage("Unauthorized"));
        }
        catch (err) {
            console.error(err);
        }
    }
};
