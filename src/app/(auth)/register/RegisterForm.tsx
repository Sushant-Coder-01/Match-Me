"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { registerUser } from "@/app/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterForm = () => {

  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });



  const onSubmit = handleSubmit(async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === "success") {
      console.log("User Register Successfully.");
      router.push("/members");
    } else {
      toast.error(result.error as string);
    }
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return (
      <div className="w-11/12 md:w-1/3 h-5/6 mx-auto bg-gray-300 rounded-3xl bg-gradient-to-tl from-gray-300 via-gray-200 to-gray-300 shimmer">
        {/* design placeholder */}
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center mt-20 w-11/12 md:1/3">
      <Card className="w-11/12 md:w-1/3 mx-auto px-1 py-5">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} className="text-gray-500" />
            <div className="text-3xl font-bold text-gray-500">Register</div>
          </div>
          <p className="text-neutral-500 font-semibold">Welcome To MatchMe!</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="space-y-4 flex flex-col">
              <div className="flex flex-col space-y-2">
                <Input
                  type="name"
                  autoComplete="off"
                  label="Full Name"
                  name="name"
                  variant="bordered"
                  {...register("name", {
                    required: "Full Name is required.",
                    pattern: /^[A-Za-z]+ [A-Za-z]+$/i,
                  })}
                  isInvalid={!!errors?.name}
                  errorMessage={errors?.name?.message as string}
                />
                {!errors.name && (
                  <p className="pl-3 text-xs font-semibold text-gray-700">
                    Start with a capital letter. (E.g. - John Doe)
                  </p>
                )}
              </div>

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
                    Min. 8 characters. (E.g. - Password@123)
                  </p>
                )}
                <button
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

              <div className="flex flex-col space-y-2">
                <Input
                  type="number"
                  label="Age"
                  name="age"
                  variant="bordered"
                  {...register("age")}
                  isInvalid={!!errors?.age}
                  errorMessage={errors?.age?.message as string}
                />
                {!errors.age && (
                  <p className="pl-3 text-xs font-semibold text-gray-700 w-full">
                    Age should be above 18.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                isDisabled={!isValid}
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;
