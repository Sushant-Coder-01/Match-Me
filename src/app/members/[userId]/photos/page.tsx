import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

type Props = {
  params: Promise<{ userId: string }>;
};

const PhotosPage = async ({ params }: Props) => {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div>
      <Card className="md:h-[80vh]">
        <CardHeader className="text-2xl font-semibold text-default-foreground">
          Photos
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {photos &&
              photos.map((photo) => (
                <Image key={photo.id} src={photo.url} alt="Image of Member" />
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PhotosPage;
