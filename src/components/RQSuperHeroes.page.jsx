import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching | ", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error | ", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData("super-heroes", onSuccess, onError, true);
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

  //console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      {/* <button onClick={refetch}>Fetch Heroes</button> */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
