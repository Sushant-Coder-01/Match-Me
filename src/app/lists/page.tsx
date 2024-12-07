import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";
import ListsTab from "./ListsTab";

type Props = {
  searchParams: Promise<{ type: string }>;
};

const ListsPage = async ({ searchParams }: Props) => {
  const { type } = await searchParams;

  const likeIds = await fetchCurrentUserLikeIds();

  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
