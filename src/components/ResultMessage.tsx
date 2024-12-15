import { ActionResult } from "@/types";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type Props = {
  result: ActionResult<string> | null;
};

const ResultMessage = ({ result }: Props) => {
  if (!result) return null;

  return (
    <div
      className={`p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-md  font-semibold ${
        result.status === "success"
          ? "text-success-800 bg-success-100"
          : "text-danger-500 bg-danger-100"
      }`}
    >
      {result.status === "success" ? (
        <FaCheckCircle size={30} />
      ) : (
        <FaExclamationTriangle size={30} />
      )}
      <p>
        {result.status === "success" ? result.data : (result.error as string)}
      </p>
    </div>
  );
};

export default ResultMessage;
