import { Pagination } from "@nextui-org/react";

const PaginationComponent = () => {
  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>results</div>
        <Pagination total={24} page={1} color="warning" variant="bordered" />
        <div className="flex flex-row gap-1 items-center">
          Page Size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              className={`w-8 h-8 text-center rounded-lg border-2 border-default-300 hover:bg-foreground-300 hover:text-black cursor-pointer`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
