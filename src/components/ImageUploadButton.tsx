"use client";

import React from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

export default function ImageUploadButton({ onUploadImage }: Props) {
  return (
    <div className="flex justify-center mt-1 mb-8">
      <CldUploadButton
        
        options={{ maxFiles: 1 }}
        signatureEndpoint="/api/sign-image"
        uploadPreset="matchme"
        onSuccess={onUploadImage}
        className="flex items-center gap-2 border-2 border-pink-500 text-pink-500 rounded-full py-3 px-6 bg-white hover:bg-pink-500 hover:text-white shadow-md transition-all"
      >
        <HiPhoto size={24} />
        <span className="font-semibold">Upload Photo</span>
      </CldUploadButton>
    </div>
  );
}
