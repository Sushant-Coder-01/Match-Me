"use client";

import { Member } from "@prisma/client";
import MemberCard from "./MemberCard";
import PaginationComponent from "@/components/PaginationComponent";
import usePaginationStore from "@/hooks/usePaginationStore";
import { useShallow } from "zustand/react/shallow";
import { startTransition, useCallback, useEffect } from "react";
import { MemberCardShimmer } from "@/components/ShimmerUI";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  members: Member[];
  likeIds: string[];
  totalCount: number;
};

const MemberLayout = ({ members, likeIds, totalCount }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { pagination, setPage, setPagination } = usePaginationStore(
    useShallow((state) => ({
      pagination: state.pagination,
      setPage: state.setPage,
      setPagination: state.setPagination,
    }))
  );

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams(window.location.search);
      if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());
      console.log(searchParams);
      router.replace(`${pathname}?${searchParams}`);
    });
  }, [router, pathname]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(() => {
    setPagination(totalCount);
  }, [totalCount, setPagination]);

  if (!members) return <MemberCardShimmer />;

  const { pageNumber, pageSize } = pagination;

  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedMembers = members.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div className="h-[68vh]">
        <div className="m-3 md:m-0  md:mt-10 gap-3 md:gap-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {members &&
            paginatedMembers.map((member) => (
              <MemberCard member={member} key={member.id} likeIds={likeIds} />
            ))}
        </div>
      </div>
      <PaginationComponent
        totalCount={totalCount}
        onPageChange={() => handlePageChange}
      />
    </div>
  );
};

export default MemberLayout;
