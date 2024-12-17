"use server";

import {
  combinedRegisterSchema,
  ProfileSchema,
  RegisterSchema,
} from "@/lib/schemas/RegisterSchema";
import { ActionResult } from "@/types";
import { prisma } from "@/lib/prisma";
import { TokenType, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generateToken, getTokenByToken } from "@/lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";

export const registerUser = async (
  data: RegisterSchema
): Promise<ActionResult<User>> => {
  try {
    const validated = combinedRegisterSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const {
      name,
      email,
      password,
      gender,
      description,
      city,
      country,
      dateOfBirth,
    } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) return { status: "error", error: "User Already Exists!" };

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPassword,
        member: {
          create: {
            name,
            description,
            city,
            country,
            dateOfBirth: new Date(dateOfBirth),
            gender,
          },
        },
      },
    });

    const verificationToken = await generateToken(
      email,
      TokenType.VERIFICATION
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong!" };
  }
};

export const signInUser = async (
  data: LoginSchema
): Promise<ActionResult<string>> => {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email)
      return { status: "error", error: "Invalid credentials" };

    if (!existingUser.emailVerified) {
      const { email, token } = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      );

      await sendVerificationEmail(email, token);

      return {
        status: "error",
        error: "Please verify your email before logging in",
      };
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!result) return { status: "error", error: "Invalid credentials" };

    return { status: "success", data: "Logged In" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/login" });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getAuthUserId = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  return userId;
};

export const verifyEmail = async (
  token: string
): Promise<ActionResult<string>> => {
  try {
    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: "error", error: "Invalid Token" };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: "error", error: "Token has Expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: "error", error: "User not found!" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await prisma.token.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { status: "success", data: "Verified successfully!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateResetPasswordEmail = async (
  email: string
): Promise<ActionResult<string>> => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "error", error: "Email is not found!" };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);

    await sendPasswordResetEmail(token.email, token.token);

    return {
      status: "success",
      data: "Password reset email has been sent.  Please check your emails",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong !" };
  }
};

export const resetPassword = async (
  password: string,
  token: string | null
): Promise<ActionResult<string>> => {
  try {
    if (!token) return { status: "error", error: "Missing Token" };

    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: "error", error: "Invalid Token" };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: "error", error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { passwordHash: hashedPassword },
    });

    await prisma.token.delete({
      where: { id: existingToken.id },
    });

    return {
      status: "success",
      data: "Password updated successfully.  Please try logging in",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
};

export const completeSocialLoginProfile = async (data: ProfileSchema) => {
  const session = await auth();

  if (!session?.user) return { status: "error", error: "User not found" };

  try {
    const user = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        profileComplete: true,
        member: {
          create: {
            name: session.user.name as string,
            image: session.user.image,
            gender: data.gender,
            dateOfBirth: new Date(data.dateOfBirth),
            description: data.description,
            city: data.city,
            country: data.country,
          },
        },
      },
      select: {
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    });

    return { status: "success", data: user.accounts[0].provider };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserRole = async () => {
  const session = await auth();

  const role = session?.user?.role;

  if (!role) throw new Error("Not in role!");

  return role;
};
