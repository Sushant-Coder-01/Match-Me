"use client";

import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination } from "@nextui-org/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  totalCount: number;
};

const PaginationComponent = ({ totalCount }: Props) => {
  const { setPage, setPageSize, setPagination, pagination } =
    usePaginationStore(
      useShallow((state) => ({
        setPage: state.setPage,
        setPageSize: state.setPageSize,
        setPagination: state.setPagination,
        pagination: state.pagination,
      }))
    );

  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [totalCount, setPagination]);

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);
  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className="hidden md:block md:border-t-2 md:w-full md:mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>{resultText}</div>
        <Pagination
          total={totalPages}
          page={pageNumber}
          className="text-pink-500"
          color="danger"
          variant="bordered"
          onChange={setPage}
        />
        <div className="flex flex-row gap-1 items-center">
          Page Size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={`flex justify-center items-center w-8 h-8 text-center rounded-lg cursor-pointer page-size-box ${
                pageSize === size
                  ? "bg-pink-500 text-white hover:bg-pink-400 hover:text-white"
                  : "hover:bg-neutral-100 hover:text-grey-500 border-2 border-default-400"
              }`}
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
