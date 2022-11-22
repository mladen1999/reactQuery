import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching | ", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error | ", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
    /*
    {
      
      //cacheTime: 5000, // Default is 5min
      //staleTime: 30000, // Default is 0sec
      refetchOnMount: true, // Query will not refetch onMount // defauls is true
      refetchOnWindowFocus: true,
      
      refetchInterval: 2000,
      refetchIntervalInBackground: true,

      enabled: false,
    }
    */
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
