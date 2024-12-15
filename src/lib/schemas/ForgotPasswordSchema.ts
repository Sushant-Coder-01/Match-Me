import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be 8 characters" }),
    confirmPassword: z.string().trim().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
