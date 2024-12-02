import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";

type Props = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage alt="Image of member" src={photo?.publicId} width={200} height={200} shadow radius={10}></CldImage>
      ) : (
        <Image alt="Image of user" width={200} height={200} src={photo?.url || "/images/user.png"} shadow="md" radius="sm" />
      )}
    </div>
  );
};

export default MemberImage;
