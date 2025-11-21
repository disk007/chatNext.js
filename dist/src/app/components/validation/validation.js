"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRoomSchema = exports.AddMessageSchema = exports.AddRoomSchema = void 0;
const zod_1 = require("zod");
exports.AddRoomSchema = zod_1.z.object({
    room: zod_1.z.string().min(1, { message: 'Chat Room is required.' })
        .refine((val) => !/^\s/.test(val), { message: "Chat Room cannot start with a space." }),
});
exports.AddMessageSchema = zod_1.z.object({
    message: zod_1.z
        .string()
        .min(1, { message: 'Message is required.' })
        .refine((val) => !/^\s/.test(val), { message: "Message cannot start with a space." }),
});
exports.JoinRoomSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, { message: "Code is required." })
        .refine((val) => !/^\s/.test(val), {
        message: "Code cannot start with a space.",
    }),
});
