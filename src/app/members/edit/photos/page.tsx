import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";
import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

const PhotosPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  if (!member) return notFound();

  return (
    <div>
      <Card className="h-[80vh]">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold text-default-foreground">
            Update Photos
          </div>
          <div>
            <MemberPhotoUpload />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="mt-2">
          <MemberPhotos
            photos={photos}
            mainImageURL={member.image}
            editing={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PhotosPage;
