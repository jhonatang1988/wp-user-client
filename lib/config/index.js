"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prod_1 = __importDefault(require("./prod"));
function default_1(env) {
    switch (env) {
        case "prod":
            return prod_1.default;
        default:
            throw new Error("env not found");
    }
}
exports.default = default_1;
