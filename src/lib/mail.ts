import { getUserByEmail } from "@/app/actions/authActions";
import {
  EmailResetTemplate,
  EmailVerificationTemplate,
} from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/verify-email?token=${token}`;
  const user = await getUserByEmail(email);

  return resend.emails.send({
    from: "match-me@resend.dev",
    to: email,
    subject: "Verify your email address",
    react: EmailVerificationTemplate({
      userName: user?.name,
      verificationLink: link,
    }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const link = `${baseUrl}/reset-password?token=${token}`;
  const user = await getUserByEmail(email);

  return resend.emails.send({
    from: "match-me@resend.dev",
    to: email,
    subject: "Reset your password",
    react: EmailResetTemplate({ userName: user?.name, resetLink: link }),
  });
};
