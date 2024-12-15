"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="space-y-4 flex flex-col">
        <div className="flex flex-col space-y-2">
          <Input
            defaultValue={getValues("name")}
            autoComplete="off"
            label="Full Name"
            variant="bordered"
            {...register("name")}
            isInvalid={!!errors?.name}
            errorMessage={errors?.name?.message as string}
          />
          {!errors.name && (
            <p className="pl-3 text-xs font-semibold text-gray-700">
              Start with a capital letter. (E.g. Tony Stark)
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Input
            defaultValue={getValues("email")}
            type="new-email"
            autoComplete="off"
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
            defaultValue={getValues("password")}
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
    </div>
  );
};

export default UserDetailsForm;
