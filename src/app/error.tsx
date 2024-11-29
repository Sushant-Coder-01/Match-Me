"use client"

import { Card, CardHeader } from "@nextui-org/react";
import { BiSolidError } from "react-icons/bi";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <BiSolidError />
        </CardHeader>
      </Card>
    </div>
  );
};

export default Error;