"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: 'Username is required.' }),
    password: zod_1.z.string().min(1, { message: 'Password is required.' }),
});
