"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBearer = void 0;
function setBearer(bearer) {
    return {
        headers: {
            Authorization: `Bearer ${bearer}`
        }
    };
}
exports.setBearer = setBearer;
