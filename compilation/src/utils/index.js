"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const constants_1 = require("./constants");
const functions_1 = require("./functions");
class UTILS {
}
UTILS.CONSTANTS = constants_1.CONSTANTS;
UTILS.FUNCTIONS = functions_1.FUNCTIONS;
UTILS.BASE = {
    16: base_1.BASE16,
    8: base_1.BASE8,
    58: base_1.BASE58,
    36: base_1.BASE36
};
exports.default = UTILS;
