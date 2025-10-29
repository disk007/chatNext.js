import {z} from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(1, {message:'Username is required.'}),
  password: z.string().min(1, {message:'Password is required.'}),
  cPassword: z.string().min(1, {message:'Confirm Password is required.'}),
})
.refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match.",
    path: ["cPassword"], 
});
export type RegisterData = z.infer<typeof RegisterSchema>;