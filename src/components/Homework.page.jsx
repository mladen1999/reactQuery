import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const HomeworkPage = () => {
  const onSuccess = (data) => {
    console.log("Uspesno: ", data);
  };
  const onError = (error) => {
    console.log("Neuspesno: ", error);
  };

  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData(onSuccess, onError);

  const handleClick = () => {
    refetch();
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>HomeworkPage</h2>
      <button onClick={handleClick}>Click me</button>
      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </div>
  );
};
