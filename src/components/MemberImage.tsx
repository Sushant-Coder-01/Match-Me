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
        <div>
          <CldImage
            alt="Image of member"
            width={200}
            height={200}
            src={photo?.publicId}
            radius={10}
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
    </div>
  );
};

export default MemberImage;
