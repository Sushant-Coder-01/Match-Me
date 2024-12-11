import PaginationComponent from "@/components/PaginationComponent";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";

type Props = {
  searchParams: Promise<GetMemberParams>;
};

const MembersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const { items: members, totalCount } = await getMembers(params);
  
  const likeIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) return <EmptyState />;

  return (
    <>
      <div className="m-3 md:m-0  md:mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-8">
        {members &&
          members.map((member) => (
            <MemberCard member={member} key={member.id} likeIds={likeIds} />
          ))}
      </div>
      <PaginationComponent />
    </>
  );
};

export default MembersPage;
