import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string().trim()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@#$!%*?&;.]/, { message: "Password must contain at least one special character." }),
  age: z.string().regex(/^(1[89]|[2-9]\d)$/, { message: "Age must be at least 18." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
