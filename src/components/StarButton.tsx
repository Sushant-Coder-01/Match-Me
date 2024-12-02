import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
  selected: boolean;
};

const StarButton = ({ loading, selected }: Props) => {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!loading ? (
        <div>
          <AiOutlineStar
            className="absolute fill-white "
            size={32}
          />
          <AiFillStar
            size={32}
            className={selected ? "fill-yellow-500" : "fill-neutral-500"}
          />
        </div>
      ) : (
        <div>
          <PiSpinnerGap className="fill-gray-400 animate-spin" size={32}/>
        </div>
      )}
    </div>
  );
};

export default StarButton;
