"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/ping", (_req, res) => {
    res.send("Pong");
});
app.listen(3000, () => console.log(`Connected on port ${3000}`));
