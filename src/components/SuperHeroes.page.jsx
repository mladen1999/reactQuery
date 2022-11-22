import axios from "axios";
import { useQuery } from "react-query";

const fetcHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const SuperHeroesPage = () => {
  const { isLoading, data, isError } = useQuery("heroes", fetcHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
