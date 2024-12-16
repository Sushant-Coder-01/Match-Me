"use client";

import CardWrapper from "@/components/CardWrapper";
import { profileSchema, ProfileSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ImProfile } from "react-icons/im";
import ProfileDetailsForm from "../register/ProfileDetailsForm";
import { Button } from "@nextui-org/react";
import { completeSocialLoginProfile } from "@/app/actions/authActions";
import { signIn } from "next-auth/react";

const CompleteProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: ProfileSchema) => {
    const result = await completeSocialLoginProfile(data);

    if (result.status === "success") {
      signIn(result.data, { callbackUrl: "/members" });
    }
  };

  return (
    <div>
      <CardWrapper
        headerText="About You"
        subHeaderText="Please complete your profile to continue to the app"
        headerIcon={ImProfile}
        body={
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-10">
                <ProfileDetailsForm />
                {errors.root?.message && (
                  <p className="text-danger text-sm">{errors.root.message}</p>
                )}
                <div className="flex flex-row items-center gap-6">
                  <Button
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    fullWidth
                    color="default"
                    className="bg-pink-500 font-semibold"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        }
      />
    </div>
  );
};

export default CompleteProfileForm;
