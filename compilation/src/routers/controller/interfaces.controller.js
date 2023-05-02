"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteResponse = exports.Status = void 0;
var Status;
(function (Status) {
    Status["success"] = "success";
    Status["error"] = "error";
    Status["warning"] = "warning";
    Status["info"] = "info";
    Status["failed"] = "failed";
})(Status = exports.Status || (exports.Status = {}));
class RouteResponse {
    setStatus(status) {
        this.status = status;
        return this;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    clear() {
        this.status = Status.error;
        this.message = "";
        this.data = undefined;
    }
}
exports.RouteResponse = RouteResponse;
