import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  return (
    <div>
      {superHeroes?.data.map((her) => {
        return <div>{her.name}</div>;
      })}
    </div>
    /* <div>
    {friends?.map.map((friend) => {
      return <div>{friend.name}</div>;
    })}
  </div> */
  );
};
