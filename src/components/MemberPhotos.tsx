"use client";

import { Photo } from "@prisma/client";
import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import { useState } from "react";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type Props = {
  photos: Photo[] | null;
  mainImageURL: string | null;
  editing: boolean;
};

const MemberPhotos = ({ photos, mainImageURL, editing }: Props) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState({
    id: "",
    type: "",
    isLoading: false,
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageURL) return null;

    setLoading({ id: photo.id, type: "main", isLoading: true });

    await setMainImage(photo);
    router.refresh();
    await update();
    toast.success("Profile picture updated successfully!");
    setLoading({ id: "", type: "", isLoading: false });
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageURL) return null;

    setLoading({ id: photo.id, type: "delete", isLoading: true });

    await deleteImage(photo);
    router.refresh();
    toast.success("Photo is deleted successfully!");
    setLoading({ id: "", type: "", isLoading: false });
  };

  return (
    <div className="grid grid-cols-5 gap-8">
      {photos &&
        photos.map((photo) => (
          <div key={photo?.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-0 left-0 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageURL}
                    loading={
                      loading.isLoading &&
                      loading.id === photo.id &&
                      loading.type === "main"
                    }
                  />
                </div>
                <div
                  onClick={() => onDelete(photo)}
                  className="absolute top-0 right-0 z-50"
                >
                  <DeleteButton
                    isLoading={
                      loading.isLoading &&
                      loading.id === photo.id &&
                      loading.type === "delete"
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MemberPhotos;
