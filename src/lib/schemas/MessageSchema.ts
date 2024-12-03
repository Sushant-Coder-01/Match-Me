import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().trim().min(1, { message: "Message is required!" }),
});

export type MessageSchema = z.infer<typeof messageSchema>;
