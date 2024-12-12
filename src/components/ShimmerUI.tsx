import { AiFillHeart } from "react-icons/ai";

export const MemberCardShimmer = () => {
  return (
    <div className="animate-pulse m-5 md:m-10 md:mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-8 ">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden animate-pulse"
        >
          {/* Like Button Placeholder */}
          <div className="absolute top-3 right-3 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
            <AiFillHeart size={30} className="text-gray-400" />
          </div>
          {/* Presence Dot Placeholder */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-gray-500 rounded-full"></div>
          {/* Image Placeholder */}
          <div className="w-full aspect-square bg-gray-300"></div>
          {/* Footer Placeholder */}
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-400 to-transparent">
            <div className="p-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-1"></div>
              <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
