import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
import { USER_DEFAULT_IMAGE } from "@/lib/constant";
import { pusherClient } from "@/lib/pusher";
import { Button, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";

type Props = {
  photo: Photo;
};

export interface PhotoApprovedEvent {
  photoId: string;
}

export interface PhotoUnapprovedEvent {
  photoId: string;
}

const MemberImage = ({ photo }: Props) => {
  const role = useRole();
  const isAdmin = role === "ADMIN";
  const router = useRouter();

  const [isApproved, setIsApproved] = useState(photo?.isApproved);

  useEffect(() => {
    const channel = pusherClient.subscribe("photo-channel");

    channel.bind("photoApproved", (data: PhotoApprovedEvent) => {
      if (data.photoId === photo.id) {
        setIsApproved(true);
        toast.success("Photo approved!");
      }
    });

    channel.bind("photoUnapproved", (data: PhotoUnapprovedEvent) => {
      if (data.photoId === photo.id) {
        setIsApproved(false);
        toast.info("Photo unapproved!");
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [photo.id]);

  if (!photo) return null;

  const approve = async () => {
    try {
      await approvePhoto(photo.id);
      setIsApproved(true);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const reject = async () => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      {photo?.publicId ? (
        <div>
          <CldImage
            alt="Image of member"
            width={200}
            height={200}
            src={photo?.publicId}
            radius={10}
            priority
            className={` rounded-2xl  ${!isApproved && !isAdmin ? "opacity-50" : ""}`}
          ></CldImage>
        </div>
      ) : (
        <div>
          <Image
            alt="Image of user"
            width={200}
            height={200}
            src={photo?.url || USER_DEFAULT_IMAGE}
            radius="sm"
          />
        </div>
      )}
      {!isApproved && !isAdmin && (
        <div className="absolute top-2/3 w-full bg-gray-200/80 p-2">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
      {isAdmin && (
        <div className="flex flex-row gap-2 mt-2 ml-1">
          <Button
            color="success"
            variant="bordered"
            fullWidth
            onPress={approve}
            className="w-[92px]"
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onPress={reject}
            color="danger"
            variant="bordered"
            fullWidth
            className="w-[92px]"
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberImage;
