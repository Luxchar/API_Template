"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RATELIMIT = void 0;
var RATELIMIT;
(function (RATELIMIT) {
    RATELIMIT[RATELIMIT["TIME"] = 900000] = "TIME";
    RATELIMIT[RATELIMIT["MAX_REQUEST"] = 500] = "MAX_REQUEST";
    RATELIMIT[RATELIMIT["STANDARD_REQUEST"] = 1] = "STANDARD_REQUEST";
    RATELIMIT[RATELIMIT["LEGACY_HEADERS"] = 1] = "LEGACY_HEADERS";
})(RATELIMIT = exports.RATELIMIT || (exports.RATELIMIT = {}));
