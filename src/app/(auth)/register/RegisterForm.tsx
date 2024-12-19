"use client";

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { RiRotateLockFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  profileSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserDetailsForm from "./UserDetailsForm";
import ProfileDetailsForm from "./ProfileDetailsForm";

const stepSchemas = [registerSchema, profileSchema];

const RegisterForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = stepSchemas[activeStep];

  const registerFormMethods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = registerFormMethods;

  const onSubmit = async () => {
    const result = await registerUser(getValues());

    if (result.status === "success") {
      toast.success("User Register Successfully.");
      await update();
      router.push("/register/success");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileDetailsForm />;
      default:
        return "Unknown step";
    }
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = async () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="flex items-center justify-center w-11/12 md:1/3 mt-12">
      <Card className="w-11/12 md:w-1/3 mx-auto px-1 py-5">
        <CardHeader className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-row items-center gap-3">
            <RiRotateLockFill size={32} className="text-pink-500" />
            <div className="text-3xl font-bold text-pink-500">Register</div>
          </div>
          <p className="text-pink-400 font-semibold">Welcome To MatchMe!</p>
        </CardHeader>
        <CardBody>
          <FormProvider {...registerFormMethods}>
            <form onSubmit={handleSubmit(onNext)} autoComplete="off">
              <div className="space-y-6">
                <div className="space-y-4">{getStepContent(activeStep)}</div>
                <div className="flex flex-row gap-2 items-center justify-center w-full">
                  {activeStep !== 0 && (
                    <Button
                      onPress={onBack}
                      fullWidth
                      className="font-semibold"
                    >
                      Back
                    </Button>
                  )}
                  <div className="w-full">
                    <Button
                      type="submit"
                      fullWidth
                      isDisabled={!isValid}
                      isLoading={isSubmitting}
                      className="bg-pink-500 font-semibold"
                    >
                      {activeStep === stepSchemas.length - 1
                        ? "Submit"
                        : "Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;
