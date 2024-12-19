import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
import { USER_DEFAULT_IMAGE } from "@/lib/constant";
import { Button, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";

type Props = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
  const role = useRole();
  const isAdmin = role === "ADMIN";
  const router = useRouter();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const reject = async (photo: Photo) => {
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
            className={` rounded-2xl  ${!photo.isApproved && !isAdmin ? "opacity-50" : ""}`}
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
      {!photo?.isApproved && !isAdmin && (
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
            onPress={() => approve(photo.id)}
            className="w-[92px]"
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onPress={() => reject(photo)}
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
