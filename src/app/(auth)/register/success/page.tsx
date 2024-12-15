"use client";

import CardWrapper from "@/components/CardWrapper";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterSuccessPage = () => {
  const router = useRouter();
  return (
    <>
      <CardWrapper
        headerText="You have successfully registered !"
        subHeaderText="Check your email, verify your account, and log in to get started."
        action={() => {
          router.push("/login");
          toast("Verify Your E-mail Before Login");
        }}
        actionLabel="Go to login"
        headerIcon={FaCheckCircle}
      />
    </>
  );
};

export default RegisterSuccessPage;
