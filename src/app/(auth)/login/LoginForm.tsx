"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data: LoginSchema) => console.log(data));

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <Card className="w-11/12 md:w-1/3 mx-auto p-5">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="flex flex-row items-center gap-3">
          <GiPadlock size={30} className="text-gray-500" />
          <div className="text-3xl font-bold text-gray-500">Login</div>
        </div>
        <p className="text-neutral-500 font-semibold">
          Welcome Back To MatchMe!
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="space-y-4 flex flex-col">
            <div className="flex flex-col space-y-2">
              <Input
                type="new-email"
                autoComplete="off"
                label="E-mail"
                name="email"
                variant="bordered"
                {...register("email")}
                isInvalid={!!errors?.email}
                errorMessage={errors?.email?.message as string}
              />
              {!errors.email && (
                <p className="pl-3 text-xs font-semibold text-gray-700">
                  Enter a valid email. (E.g. user123@gmail.com)
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Input
                type="new-password"
                autoComplete="off"
                label="Password"
                name="password"
                variant="bordered"
                {...register("password")}
                isInvalid={!!errors?.password}
                errorMessage={errors?.password?.message as string}
              />
              {!errors.password && (
                <p className="pl-3 text-xs font-semibold text-gray-700">
                  Min. 8 characters. (E.g. Password@123)
                </p>
              )}
            </div>

            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
              fullWidth
              color="default"
            >
              Sign In
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
