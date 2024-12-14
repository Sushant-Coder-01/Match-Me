import { z } from "zod";
import { calculateAge } from "../util";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@#$!%*?&;.]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const profileSchema = z.object({
  gender: z.string().min(1),
  description: z.string().trim().min(1),
  city: z.string().trim().min(1),
  country: z.string().trim().min(1),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required!" })
    .refine(
      (dateString) => {
        const age = calculateAge(new Date(dateString));
        return age >= 18;
      },
      { message: "You must be at least 18." }
    ),
});

export const combinedRegisterSchema = registerSchema.and(profileSchema)

export type RegisterSchema = z.infer<typeof registerSchema & typeof profileSchema>;
