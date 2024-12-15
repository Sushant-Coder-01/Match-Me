import { TokenType } from "@prisma/client";
import { randomBytes } from "crypto";
import { prisma } from "./prisma";

export const getTokenByEmail = async (email: string) => {
  try {
    return await prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateToken = async (email: string, type: TokenType) => {
  const token = randomBytes(48).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await getTokenByEmail(email);

  if (existingToken) {
    await prisma.token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return prisma.token.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });
};

export const getTokenByToken = async (token: string) => {
  try {
    return prisma.token.findFirst({
      where: { token },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
