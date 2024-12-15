"use client";

import { resetPassword } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/schemas/ForgotPasswordSchema";
import { ActionResult } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { BsFillShieldLockFill } from "react-icons/bs";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    console.log(data);
    setResult(await resetPassword(data.password, searchParams.get("token")));
    reset();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <CardWrapper
        headerIcon={BsFillShieldLockFill}
        headerText="Reset Password"
        subHeaderText="Enter your new password below"
        body={
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              variant="bordered"
              defaultValue=""
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 -translate-x-8 translate-y-2 text-gray-500"
              aria-label="Toggle Password Visibility"
            >
              {passwordVisible ? (
                <span>
                  <BiSolidShow size={20} />
                </span>
              ) : (
                <span>
                  <BiSolidHide size={20} />
                </span>
              )}
            </button>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              variant="bordered"
              defaultValue=""
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message as string}
            />
            <Button
              type="submit"
              color="default"
              className="bg-pink-500 font-semibold"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              Reset Password
            </Button>
          </form>
        }
        footer={<ResultMessage result={result} />}
      />
    </div>
  );
};

export default ResetPasswordForm;
