"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE16 = void 0;
function BASE16(number) {
    var base16 = "";
    var base16chars = "0123456789ABCDEF";
    while (number > 0) {
        base16 = base16chars[number % 16] + base16;
        number = Math.floor(number / 16);
    }
    return base16;
}
exports.BASE16 = BASE16;
