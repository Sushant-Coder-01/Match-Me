import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  isLoading: boolean;
};

const DeleteButton = ({ isLoading }: Props) => {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!isLoading ? (
        <div>
          <AiOutlineDelete size={28} className="absolute fill-white " />
          <AiFillDelete size={28} className="fill-red-600" />
        </div>
      ) : (
        <div>
          <PiSpinnerGap size={28} className="animate-spin fill-gray-400 " />
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
