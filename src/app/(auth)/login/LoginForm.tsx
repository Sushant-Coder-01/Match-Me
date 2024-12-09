"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const router = useRouter();
  const { data: session, status, update } = useSession();
  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    const result = await signInUser(data);

    if (result.status === "success") {
      await update();
      router.push("/members");
      router.refresh();
    } else {
      toast.error((result.error as string) || "An unknown error occurred");
    }
  });

  const [isSSR, setIsSSR] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isSSR) {
    return (
      <div className="w-11/12 md:w-1/3 h-4/6 mx-auto bg-gray-300 rounded-3xl bg-gradient-to-tl from-gray-300 via-gray-200 to-gray-300 shimmer">
        {/* design placeholder */}
      </div>
    );
  }

  return (
    <Card className="w-11/12 md:w-1/3 mx-auto px-1 py-5">
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
                type="email"
                autoComplete="new-email"
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

            <div className="flex flex-col space-y-2 relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
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
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-3 text-gray-500"
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
