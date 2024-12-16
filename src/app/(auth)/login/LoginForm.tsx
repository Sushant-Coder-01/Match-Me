"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { BsFillShieldLockFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Loading from "@/app/members/loading";
import Link from "next/link";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { update } = useSession();

  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    setLoading(true);
    const result = await signInUser(data);

    if (result.status === "success") {
      await update();
      router.push("/members");
      router.refresh();
    } else {
      setLoading(false);
      toast.error((result.error as string) || "An unknown error occurred");
    }
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
      <Card className="w-10/12 md:w-1/3 mx-auto px-1 py-5">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-3">
            <BsFillShieldLockFill size={30} className="text-pink-500" />
            <div className="text-3xl font-bold text-pink-500">Login</div>
          </div>
          <p className="text-pink-400 font-semibold">
            Welcome Back To MatchMe!
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="space-y-6 flex flex-col">
              <div className="space-y-4 flex flex-col">
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    autoComplete="new-email"
                    label="E-mail"
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
              </div>

              <Button
                isDisabled={!isValid}
                isLoading={isSubmitting}
                type="submit"
                fullWidth
                className="bg-pink-500 font-semibold"
              >
                Sign In
              </Button>

              <SocialLogin />

              <div className="flex justify-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:px-2 focus:py-1 focus:bg-blue-200 focus:rounded-sm focus:ring-blue-500 underline transition duration-300"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
  );
};

export default LoginForm;
