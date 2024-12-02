"use server";

import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { ActionResult } from "@/types";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const registerUser = async (
  data: RegisterSchema
): Promise<ActionResult<User>> => {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password, age } = validated.data;

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
        age: age,
      },
    });

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
  await signOut({redirectTo: "/login"});
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
