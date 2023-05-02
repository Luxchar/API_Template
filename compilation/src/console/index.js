"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = process.stdin.on('readable', () => {
    let data;
    while ((data = process.stdin.read()) !== null) {
        try {
            process.stdout.clearLine(0);
            const prefix = data.toString().trim().split(' ')[0].toLowerCase();
            const args = data.toString().trim().split(' ').slice(1);
            fs_1.default.readdirSync(__dirname + '/commands').forEach((file) => {
                if (file.split('.')[0] === prefix) {
                    require(__dirname + '/commands/' + file.split('.')[0])(prefix, args);
                }
            });
        }
        catch (e) {
            process.stdout.clearLine(0);
            continue;
        }
    }
});
