"use client";

import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const MemberPhotoUpload = () => {
  const router = useRouter();
  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    console.log("onAddImage called with result:", result);
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Problem while adding image!");
    }
  };

  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
};

export default MemberPhotoUpload;
