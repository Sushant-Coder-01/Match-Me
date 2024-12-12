import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";
import MemberLayout from "./MemberLayout";

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
      <MemberLayout
        members={members}
        likeIds={likeIds}
        totalCount={totalCount}
      />
    </div>
  );
};

export default MembersPage;
