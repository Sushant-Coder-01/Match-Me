"use server"

import { prisma } from "@/lib/prisma";
import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/MemberEditSchema";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";
import { getAuthUserId } from "./authActions";

export const updateMemberProfile = async (
  data: MemberEditSchema,
  updatedName: boolean
): Promise<ActionResult<Member>> => {
  try {
    const userId = await getAuthUserId();

    const validated = memberEditSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { name, description, city, country } = validated.data;

    if (updatedName) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: { name },
      });
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      error: "Something went wrong while updating profile",
    };
  }
};
