"use client";

import { useEffect, useState } from "react";
import { getUnapprovedPhotos } from "@/app/actions/adminActions";
import MemberPhotos from "@/components/MemberPhotos";
import { Divider } from "@nextui-org/react";
import { pusherClient } from "@/lib/pusher";
import { Photo } from "@prisma/client";
import { toast } from "react-toastify";

export interface PhotoApprovedEvent {
  photoId: string;
}

export interface PhotoUnapprovedEvent {
  photo: Photo;
}

const PhotoModerationPage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const unapprovedPhotos = await getUnapprovedPhotos();
        setPhotos(unapprovedPhotos);
      } catch (error) {
        toast.error("Failed to fetch photos.");
        throw error;
      }
    };

    fetchPhotos();

    const channel = pusherClient.subscribe("photo-channel");

    channel.bind("photoApproved", (data: PhotoApprovedEvent) => {
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== data.photoId)
      );
      toast.success("Photo approved!");
    });

    channel.bind("photoUnapproved", (data: PhotoUnapprovedEvent) => {
      setPhotos((prevPhotos) => [...prevPhotos, data.photo]);
      toast.info("Photo unapproved!");
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (!photos.length) {
    return (
      <div className="text-center mt-56 text-3xl font-bold text-orange-400">
        There are no photos awaiting moderation.
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10 gap-3">
      <h3 className="text-2xl">Photos awaiting moderation</h3>
      <Divider />
      <MemberPhotos photos={photos} />
    </div>
  );
};

export default PhotoModerationPage;
