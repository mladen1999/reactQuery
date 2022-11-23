import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
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

export const useAddSuperHeroData = () => {
  const queryClinet = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      /* queryClinet.invalidateQueries("super-heroes"); */
      queryClinet.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
