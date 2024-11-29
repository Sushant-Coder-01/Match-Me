"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getMembers = async () => {
  const session = await auth();

  if (!session.user) return null;

  try {
    return await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMemberByUserId = async (userId: string) => {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
    });
    return member; 
  } catch (error) {
    console.error("Error fetching member by userId:", error);
    throw new Error("Unable to fetch member.");
  }
};
