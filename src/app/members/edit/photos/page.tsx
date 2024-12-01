import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import MemberPhotoUpload from "./MemberPhotoUpload";

const PhotosPage = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold text-default-foreground">
            Edit Profile
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <MemberPhotoUpload />
        </CardBody>
      </Card>
    </div>
  );
};

export default PhotosPage;
