"use client";

import { generateResetPasswordEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { ActionResult } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsFillShieldLockFill } from "react-icons/bs";

const ForgotPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setResult(await generateResetPasswordEmail(data.email));
    reset();
  };

  return (
    <div>
      <CardWrapper
        headerIcon={BsFillShieldLockFill}
        headerText="Forgot Password"
        subHeaderText="Enter account email to reset your password"
        body={
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              placeholder="Eamil Address"
              variant="bordered"
              defaultValue=""
              color="warning"
              {...register("email", { required: true })}
            />
            <Button
              type="submit"
              color="default"
              isLoading={isSubmitting}
              isDisabled={!isValid}
              className="bg-pink-400 font-semibold"
            >
              Send reset email
            </Button>
          </form>
        }
        footer={<ResultMessage result={result} />}
      />
    </div>
  );
};

export default ForgotPasswordForm;
