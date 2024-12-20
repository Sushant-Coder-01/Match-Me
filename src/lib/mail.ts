import { getUserByEmail } from "@/app/actions/authActions";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { APP_LOGO } from "./constant";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const getEmailVerificationTemplate = (
  userName: string,
  verificationLink: string
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center;">
      <img src=${APP_LOGO} alt="App Logo" style="width: 100px; height: 100px; border-radius: 50%;" />
    </div>
    <h1 style="color: #333; text-align: center;">Hello, ${userName}!</h1>
    <p style="color: #555; text-align: center;">Thank you for joining us! You're just one step away from unlocking a world of connections. Verify your email by clicking the button below.</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${verificationLink}" style="background-color: #ff4081; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
    </div>
    <p style="color: #999; text-align: center;">If you didn't request this, please ignore this email. For help, contact our support team.</p>
  </div>
`;

const getEmailResetTemplate = (userName: string, resetLink: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center;">
      <img src=${APP_LOGO} alt="App Logo" style="width: 100px; height: 100px; border-radius: 50%;" />
    </div>
    <h1 style="color: #333; text-align: center;">Hello, ${userName}!</h1>
    <p style="color: #555; text-align: center;">Please reset your password by clicking the button below.</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" style="background-color: #ff4081; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </div>
    <p style="color: #999; text-align: center;">If you didn't request this, please ignore this email. For help, contact our support team.</p>
  </div>
`;

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const link = `${baseUrl}/verify-email?token=${token}`;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  const userName = user.name || "User";
  const htmlContent = getEmailVerificationTemplate(userName, link);

  const msg: MailDataRequired = {
    to: email,
    from: "matchme.in@gmail.com", // Use a verified sender email
    subject: "Verify your email address",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const link = `${baseUrl}/reset-password?token=${token}`;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  const userName = user.name || "User";
  const htmlContent = getEmailResetTemplate(userName, link);

  const msg: MailDataRequired = {
    to: email,
    from: "matchme.in@gmail.com", // Use a verified sender email
    subject: "Reset your password",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};
