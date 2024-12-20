

import { APP_LOGO } from "@/lib/constant";
import {
  Html,
  Head,
  Body,
  Container,
  Button,
  Text,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type EmailVerificationProps = {
  userName: string | null | undefined;
  verificationLink: string;
};

export const EmailVerificationTemplate = ({
  userName,
  verificationLink,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 p-6 font-sans rounded-lg">
          <Container className="max-w-lg mx-auto bg-pink-100 bg-gra p-8 rounded-lg shadow-lg text-center">
            <div className="mb-6">
              <Img
                src={APP_LOGO}
                alt="App Logo"
                width={100}
                height={100}
                className="max-w-xs mx-auto rounded-full"
              />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome, {userName || "New Match"}!
            </h1>
            <Text className="text-lg text-gray-600 mb-6">
              Thank you for joining us! You&apos;re just one step away from
              unlocking a world of connections. Verify your email by clicking
              the button below.
            </Text>
            <Button
              href={verificationLink}
              className="inline-block px-6 py-3 bg-pink-600 text-white text-xl font-bold rounded-md"
            >
              Verify Email
            </Button>
            <Text className="mt-6 text-sm text-gray-500">
              If you didn&apos;t request this, please ignore this email. For
              help, contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

type PasswordResetProps = {
  userName: string | null | undefined;
  resetLink: string;
};

export const EmailResetTemplate = ({
  userName,
  resetLink,
}: PasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 p-6 font-sans rounded-lg">
          <Container className="max-w-lg mx-auto bg-pink-100 p-8 rounded-lg shadow-lg text-center">
            <div className="mb-6">
              <Img
                src={APP_LOGO}
                alt="App Logo"
                width={100}
                height={100}
                className="max-w-xs mx-auto rounded-full"
              />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Hi, {userName || "Valued User"}!
            </h1>
            <Text className="text-lg text-gray-600 mb-6">
              We received a request to reset your password. You can reset it by
              clicking the button below.
            </Text>
            <Button
              href={resetLink}
              className="inline-block px-6 py-3 bg-pink-600 text-white text-xl font-bold rounded-md"
            >
              Reset Password
            </Button>
            <Text className="mt-6 text-sm text-gray-500">
              If you didn&apos;t request a password reset, please ignore this
              email. For help, contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
