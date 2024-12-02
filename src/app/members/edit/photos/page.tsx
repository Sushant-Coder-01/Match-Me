import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";
import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";

const PhotosPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div>
      <Card className="h-[80vh]">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold text-default-foreground">
            Edit Profile
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <MemberPhotoUpload />
          <MemberPhotos photos={photos} mainImageURL={member.image} editing={true}/>
        </CardBody>
      </Card>
    </div>
  );
};

export default PhotosPage;
