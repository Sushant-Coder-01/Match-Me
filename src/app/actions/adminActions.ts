"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { cloudinary } from "@/lib/cloudinary";
import { Photo } from "@prisma/client";
import { pusherServer } from "@/lib/pusher";

export const getUnapprovedPhotos = async () => {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") throw new Error("Forbidden");

    return prisma.photo.findMany({
      where: { isApproved: false },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const approvePhoto = async (photoId: string) => {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") throw new Error("Forbidden");

    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      include: { member: { include: { user: true } } },
    });

    if (!photo || !photo.member || !photo.member?.user)
      throw new Error("Cannot approve this image");

    const { member } = photo;

    const userUpdate =
      member.user && member.user.image === null ? { image: photo.url } : {};

    const memberUpdate = member.image === null ? { image: photo.url } : {};

    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({
        where: { id: member.userId },
        data: userUpdate,
      });
    }

    await prisma.member.update({
      where: { id: member.id },
      data: {
        ...memberUpdate,
        photos: {
          update: {
            where: { id: photo.id },
            data: { isApproved: true },
          },
        },
      },
    });

    pusherServer.trigger("photo-channel", "photoApproved", {
      photoId,
      photoUrl: photo.url,
    });

    return photo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function rejectPhoto(photo: Photo) {
  try {
    const role = await getUserRole();
    const photoId = photo.id;

    if (role !== "ADMIN") throw new Error("Forbidden");

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    await prisma.photo.update({
      where: { id: photoId },
      data: { isApproved: false },
    });

    await prisma.photo.delete({
      where: { id: photoId },
    });

    pusherServer.trigger("photo-channel", "photoUnapproved", {
      photoId,
    });

    return { photoId };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
