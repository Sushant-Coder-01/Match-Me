"use server";

import { prisma } from "@/lib/prisma";
import { GetMemberParams, PaginatedResponse } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { addYears } from "date-fns";

const getAgeRange = (ageRange: string): Date[] => {
  const [minAge, maxAge] = ageRange.split(",");

  const currentDate = new Date();

  const minDob = addYears(currentDate, -maxAge - 1);
  const maxDob = addYears(currentDate, -minAge);

  return [minDob, maxDob];
};

export const getMembers = async ({
  ageRange = "18,100",
  gender = "male,female",
  orderBy = "updated",
  pageNumber = "1",
  pageSize = "12",
  withPhoto = "true",
}: GetMemberParams): Promise<PaginatedResponse<Member>> => {
  const userId = await getAuthUserId();

  const [minDob, maxDob] = getAgeRange(ageRange);

  const selectedGender = gender.split(",");

  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const membersSelect = {
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhoto === "true" ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId,
        },
      },
    };

    const count = await prisma.member.count(membersSelect);

    const members = await prisma.member.findMany({
      ...membersSelect,
      orderBy: {
        [orderBy]: "desc",
      },
      skip,
      take: limit,
    });

    return {
      items: members,
      totalCount: count,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMemberByUserId = async (userId: string) => {
  try {
    if (!userId) return;
    const member = await prisma.member.findUnique({
      where: { userId },
    });
    return member;
  } catch (error) {
    console.error("Error fetching member by userId:", error);
    throw new Error("Unable to fetch member.");
  }
};

export const getMemberPhotosByUserId = async (userId: string) => {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });

    if (!member) return null;

    return member.photos.map((photo) => photo) as Photo[];
  } catch (error) {
    console.error("Error fetching Member's Photos:", error);
    throw new Error("Unable to fetch Member's Photos");
  }
};

export const updateLastActive = async () => {
  const userId = await getAuthUserId();

  try {
    return await prisma.member.update({
      where: { userId },
      data: { updated: new Date() },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
