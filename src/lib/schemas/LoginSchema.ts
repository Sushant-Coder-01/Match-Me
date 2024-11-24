import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character." }),
    })

export type LoginSchema = z.infer<typeof loginSchema>