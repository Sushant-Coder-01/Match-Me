import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";
import MemberCard from "./MemberCard";
import PaginationComponent from "@/components/PaginationComponent";

type Props = {
  searchParams: Promise<GetMemberParams>;
};

const MembersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const { items: members, totalCount } = await getMembers(params);

  const likeIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) return <EmptyState />;

  return (
    <div>
      <div className="md:h-[68vh] my-5 mb-10 md:my-0 md:mb-0">
        <div className="m-3 md:m-0  md:mt-10 gap-3 md:gap-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {members &&
            members.map((member) => (
              <MemberCard member={member} key={member.id} likeIds={likeIds} />
            ))}
        </div>
      </div>
      <PaginationComponent totalCount={totalCount} />
    </div>
  );
};

export default MembersPage;
