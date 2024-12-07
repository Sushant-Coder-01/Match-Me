"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { pusherServer } from "@/lib/pusher";

export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean
) => {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      const like = await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
        select: {
          sourceMember: {
            select: {
              name: true,
              image: true,
              userId: true,
            },
          },
        },
      });

      await pusherServer.trigger(`private-${targetUserId}`, "like:new", {
        name: like.sourceMember.name,
        image: like.sourceMember.image,
        userId: like.sourceMember.userId,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCurrentUserLikeIds = async () => {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchLikedMembers = async (type: string) => {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSourceLikes = async (userId: string) => {
  try {
    const sourceList = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetMember: true,
      },
    });

    return sourceList.map((x) => x.targetMember);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTargetLikes = async (userId: string) => {
  try {
    const targetList = await prisma.like.findMany({
      where: {
        targetUserId: userId,
      },
      select: {
        sourceMember: true,
      },
    });

    return targetList.map((x) => x.sourceMember);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMutualLikes = async (userId: string) => {
  try {
    const likedUsers = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    const likedIds = likedUsers.map((x) => x.targetUserId);

    const mutualList = await prisma.like.findMany({
      where: {
        AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
      },
      select: {
        sourceMember: true,
      },
    });

    return mutualList.map((x) => x.sourceMember);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
