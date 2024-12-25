"use client";

import { createMessage } from "@/app/actions/messageActions";
import { messageSchema, MessageSchema } from "@/lib/schemas/MessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const ChatForm = () => {
  const params = useParams<{ userId: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);

    if (result.status === "error") {
      toast.error(
        "An error occurred while sending your message. Please try again."
      );
    }

    reset();
    router.refresh();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div
          className="flex justify-center items-start gap-2"
        >
          <Input
            fullWidth
            placeholder="Type a message..."
            variant="faded"
            {...register("text")}
            isInvalid={!!errors.text}
            errorMessage={errors.text?.message}
          />
          <Button
            type="submit"
            className="bg-white"
            isIconOnly
            isLoading={isSubmitting}
            isDisabled={!isValid && !isSubmitting}
          >
            <IoSend size={28} className="fill-pink-500" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
