import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

const MembersPage = async () => {
  const members = await getMembers();

  return (
    <div className="m-10 md:m-0  md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members && members.map((member) => (
        <MemberCard member={member} key={member.id} />
      ))}
    </div>
  );
};

export default MembersPage;
