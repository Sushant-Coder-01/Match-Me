import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

type Props = {
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  body?: ReactNode;
  action?: () => void;
  actionLabel: string;
  footer?: ReactNode;
};

const CardWrapper = ({
  headerIcon: Icon,
  headerText,
  subHeaderText,
  body,
  action,
  actionLabel,
  footer,
}: Props) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="w-2/5 mx-auto p-5 bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3 items-center text-center">
            <div className="flex flex-col items-center gap-3">
              <Icon size={50} color="#FF69B4" />
              <h1 className="text-3xl font-semibold text-pink-600">
                {headerText}
              </h1>
            </div>
            {subHeaderText && <p className="text-pink-400">{subHeaderText}</p>}
          </div>
        </CardHeader>
        {body && <CardBody className="text-gray-600">{body}</CardBody>}
        <CardFooter className="flex flex-col justify-center">
          {action && (
            <Button
              onPress={action}
              color="default"
              variant="bordered"
              className="w-56 hover:bg-pink-200 border-pink-500"
            >
              <span className="text-pink-500 font-semibold">{actionLabel}</span>
            </Button>
          )}
          {footer && <>{footer}</>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
