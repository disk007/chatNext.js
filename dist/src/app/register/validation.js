"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: 'Username is required.' }),
    password: zod_1.z.string().min(1, { message: 'Password is required.' }),
    cPassword: zod_1.z.string().min(1, { message: 'Confirm Password is required.' }),
})
    .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match.",
    path: ["cPassword"],
});
