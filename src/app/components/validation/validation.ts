import {z} from 'zod';

export const AddRoomSchema = z.object({
  room: z.string().min(1, {message:'Chat Room is required.'}),
});
export const AddMessageSchema = z.object({
  message: z.string().min(1, {message:'Message is required.'}),
});
export type AddRoomData = z.infer<typeof AddRoomSchema>;
export type AddMessageData = z.infer<typeof AddMessageSchema>;