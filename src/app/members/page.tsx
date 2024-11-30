import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

const MembersPage = async () => {
  const members = await getMembers();

  return (
    <div className="m-3 md:m-0  md:mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-8">
      {members && members.map((member) => (
        <MemberCard member={member} key={member.id} />
      ))}
    </div>
  );
};

export default MembersPage;
