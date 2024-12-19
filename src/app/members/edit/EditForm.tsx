"use client";

import { updateMemberProfile } from "@/app/actions/userActions";
import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/MemberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: MemberEditSchema) => {
    const updatedName: boolean = data.name !== member.name;
    console.log("updatedName::: ", updatedName);
    const result = await updateMemberProfile(data, updatedName);

    console.log("result::: ", result);

    if (result.status === "success") {
      toast.success("Profile updated !");
      router.refresh();
      reset({ ...data });
    } else {
      toast.error("Error while updating Profile");
    }
  };

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
          <Textarea
            label="Description"
            variant="bordered"
            {...register("description")}
            defaultValue={member.description}
            minRows={6}
            isInvalid={!!errors?.description}
            errorMessage={errors.description?.message}
          />
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
            Update profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
