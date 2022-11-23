import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (name, onSuccess, onError, enabled) => {
  return useQuery(name, fetchSuperHeroes, {
    onSuccess,
    onError,
    /* select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    }, */
    enabled: enabled,
  });
};
