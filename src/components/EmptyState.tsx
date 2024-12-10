import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PiSmileySadBold } from "react-icons/pi";

const EmptyState = () => {
  return (
    <div className="flex justify-center items-center text-center mt-20">
      <Card className="p-5 bg-pink-100 rounded-xl max-w-xl w-full flex flex-col justify-center items-center">
        <CardHeader className="text-3xl text-gradient text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-bold flex flex-col gap-2">
          <PiSmileySadBold size={50} className="text-red-500" />
          <span>There are no results for this filter!</span>
        </CardHeader>
        <CardBody className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Please select a different filter
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmptyState;
