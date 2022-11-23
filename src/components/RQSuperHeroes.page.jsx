import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching | ", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error | ", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData("super-heroes", onSuccess, onError, true);

  const {
    mutate: addHero,
    isLoading: isLoadingHeroes,
    isError: isErrorHeroes,
    error: errorHeroes,
    isFetching: isFetchingHeroes,
  } = useAddSuperHeroData();
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

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoadingHeroes || isFetchingHeroes) {
    return <div>Loading...</div>;
  }

  if (isErrorHeroes) {
    return <h2>{errorHeroes.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      {<button onClick={refetch}>Fetch Heroes</button>}
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
