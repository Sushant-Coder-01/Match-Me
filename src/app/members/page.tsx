import { Button } from "@nextui-org/react";
import Link from "next/link";

const MembersPage = () => {
  return (
    <div className="m-10">
      <h1 className="text-xl">Members Page</h1>
      <Link href={"/"}><Button color="secondary" variant="bordered">Go to The Home</Button></Link>
    </div>
  );
};

export default MembersPage;
