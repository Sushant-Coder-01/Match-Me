import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
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
            src={photo?.url || "/images/user.png"}
            radius="sm"
          />
        </div>
      )}
      {!photo?.isApproved && !isAdmin && (
        <div className="absolute rounded-b-2xl bottom-3 w-full bg-gray-200/80 p-2">
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
