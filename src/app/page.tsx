import { Button } from "@nextui-org/react";
import Link from "next/link";
import { GoSmiley } from "react-icons/go";
const Page = () => {
  return (
    <div className="m-10">
      <h1 className="text-orange-400 text-xl my-5">
        Hello, Next.js! I am building Dating app - Match-Me
      </h1>
      <Button as={Link} href="members" color="primary" variant="bordered">
        <GoSmiley />
        Click Me
      </Button>
    </div>
  );
};

export default Page;
