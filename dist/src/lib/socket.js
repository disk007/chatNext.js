"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)(process.env.NEXT_PUBLIC_BASE_URL, {
    transports: ["websocket"],
});
exports.default = socket;
