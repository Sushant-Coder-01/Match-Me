"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { BiSolidError } from "react-icons/bi";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="w-2/5 mx-auto py-10">
        <CardHeader className="flex flex-col justify-center">
          <div className="flex flex-row gap-2 items-center text-default-foreground">
            <BiSolidError size={40} className="text-danger" />
            <h1 className="text-4xl font-semibold text-danger">Error</h1>
          </div>
        </CardHeader>
        <CardBody className="flex justify-center items-center text-danger">
          <div className="text-2xl">{error.message}</div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()} color="secondary" variant="bordered" className="w-32" >
            <span className="text-lg font-semibold">Try Again</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Error;
