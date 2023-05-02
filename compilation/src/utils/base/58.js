"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE58 = void 0;
function BASE58(number) {
    var base58 = "";
    var base58chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    while (number > 0) {
        base58 = base58chars[number % 58] + base58;
        number = Math.floor(number / 58);
    }
    return base58;
}
exports.BASE58 = BASE58;
