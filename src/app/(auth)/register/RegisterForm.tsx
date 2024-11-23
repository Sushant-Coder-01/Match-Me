"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { user: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const [isSSR, setIsSSR] = useState(true);

  // Run useEffect only on the client to switch to client-side rendering
  useEffect(() => {
    setIsSSR(false); // Set isSSR to false after the component is mounted
  }, []);

  // Render only after the component is mounted (client-side)
  if (isSSR) {
    return null; // or show a loading spinner, placeholder, etc.
  }

  return (
    <Card className="w-11/12 md:w-1/3 mx-auto">
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
          <Input
              type="name"
              autoComplete="off"
              label="Full Name"
              name="user"
              {...register("user", { required: true })}
            />
            <Input
              type="new-email"
              autoComplete="off"
              label="E-mail"
              name="email"
              {...register("email", { required: true })}
            />
            <Input
              type="new-password"
              autoComplete="off"
              label="Password"
              name="password"
              {...register("password", { required: true })}
            />
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
