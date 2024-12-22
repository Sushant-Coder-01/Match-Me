"use client";

import { updateMemberProfile } from "@/app/actions/userActions";
import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/MemberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsStars } from "react-icons/bs";

type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const router = useRouter();
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isValid, isDirty, errors, isSubmitting },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const fetchDescriptionSuggestion = async () => {
    setSuggestionLoading(true);
    try {
      const prompt = `You are an assistant for a dating app. Your task is to create a simple, attractive, and engaging profile description for a user based on the provided details. Keep the tone friendly, approachable, and easy to read. Use short, clear sentences.

      Here is the user's description: Name: ${member.name}, Description: ${member.description}, City: ${member.city}, Country: ${member.country}
      
      Based on this, create a brief profile summary in simple English. Highlight the user's key hobbies, profession, or interests in a way that makes them appealing. Avoid repeating unnecessary details and ensure the summary sounds natural. Format it in no more than 3-4 sentences.
      Must give.`;

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch description suggestion");
      }

      const data = await response.json();

      setSuggestion(data.text);
      setShowSuggestionModal(true);
      toast.success("Description suggestion fetched!");
    } catch (error) {
      console.error("Error fetching description suggestion:", error);
      toast.error("Failed to fetch description suggestion. Please try again.");
    } finally {
      setSuggestionLoading(false);
    }
  };

  const onSubmit = async (data: MemberEditSchema) => {
    try {
      const updatedName: boolean = data.name !== member.name;
      const result = await updateMemberProfile(data, updatedName);

      if (result.status === "success") {
        toast.success("Profile updated!");
        router.refresh();
        reset({ ...data });
      } else {
        throw new Error("Error while updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error while updating profile. Please try again.");
    }
  };

  const handleUseSuggestion = () => {
    setValue("description", suggestion, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowSuggestionModal(false);
  };

  const descriptionValue = watch("description");

  return (
    <div className="relative">
      <div>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name"
            variant="bordered"
            defaultValue={member.name}
            {...register("name")}
            isInvalid={!!errors?.name}
            errorMessage={errors.name?.message}
          />
          <div className="relative flex flex-col space-y-2">
            <Textarea
              label="Description"
              variant="bordered"
              {...register("description")}
              defaultValue={member.description}
              value={descriptionValue}
              minRows={6}
              isInvalid={!!errors?.description}
              errorMessage={errors.description?.message}
            />
            <div className="absolute right-1 -top-1">
              <Button
                isIconOnly
                size="sm"
                onPress={fetchDescriptionSuggestion}
                className="cursor-pointer text-pink-600 bg-orange-100"
                isLoading={suggestionLoading}
              >
                <BsStars size={20} />
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Input
              label="City"
              variant="bordered"
              defaultValue={member.city}
              {...register("city")}
              isInvalid={!!errors?.city}
              errorMessage={errors.city?.message}
            />
            <Input
              label="Country"
              variant="bordered"
              defaultValue={member.country}
              {...register("country")}
              isInvalid={!!errors?.country}
              errorMessage={errors.country?.message}
            />
          </div>
          <Button
            type="submit"
            variant="solid"
            color="warning"
            className="flex self-end"
            isDisabled={!isValid || !isDirty}
            isLoading={isSubmitting}
          >
            Update Profile
          </Button>
        </form>
      </div>
      <div className="block md:hidden mt-4">
        {showSuggestionModal && (
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">
              Description Suggestion
            </h3>
            <p>{suggestion}</p>
            <div className="flex justify-end mt-4">
              <Button onPress={handleUseSuggestion} className="mr-2">
                Use this suggestion
              </Button>
              <Button
                onPress={() => setShowSuggestionModal(false)}
                variant="flat"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block mt-4">
        {showSuggestionModal && (
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">
              Description Suggestion
            </h3>
            <p>{suggestion}</p>
            <div className="flex justify-end mt-4">
              <Button onPress={handleUseSuggestion} className="mr-2">
                Use this suggestion
              </Button>
              <Button
                onPress={() => setShowSuggestionModal(false)}
                variant="flat"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditForm;
