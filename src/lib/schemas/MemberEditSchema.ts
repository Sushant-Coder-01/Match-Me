import { z } from "zod";

export const memberEditSchema = z.object({
  name: z.string().trim().min(3, { message: "Name is required." }),
  description: z.string().trim().min(3, { message: "Description is required." }),
  city: z.string().trim().min(1, { message: "City is required." }),
  country: z.string().trim().min(1, { message: "Country is required." }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
