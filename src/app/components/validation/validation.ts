import {z} from 'zod';

export const AddRoomSchema = z.object({
  room: z.string().min(1, {message:'Chat Room is required.'})
    .refine((val) => !/^\s/.test(val), { message: "Chat Room cannot start with a space." }),
});
export const AddMessageSchema = z.object({
  message: z
    .string()
    .min(1, {message:'Message is required.'})
    .refine((val) => !/^\s/.test(val), { message: "Message cannot start with a space." }),

});
export const JoinRoomSchema = z.object({
  code: z.string().min(1, {message: "Code is required." })
    .refine((val) => !/^\s/.test(val), {
      message: "Code cannot start with a space.",
    }),
});
export const EditMessageSchema = z.object({
  message: z.string().min(1, {message:'Message is required.'})
    .refine((val) => !/^\s/.test(val), { message: "Message cannot start with a space." }),
});

export type AddRoomData = z.infer<typeof AddRoomSchema>;
export type AddMessageData = z.infer<typeof AddMessageSchema>;
export type JoinRoomData = z.infer<typeof JoinRoomSchema>;
export type EditMessageData = z.infer<typeof EditMessageSchema>;