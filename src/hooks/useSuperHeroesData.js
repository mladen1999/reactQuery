import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios.utils";

const fetchSuperHeroes = () => {
  //return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  //return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
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
    /* onSuccess: (data) => {
       queryClinet.invalidateQueries("super-heroes"); */
    /*
      queryClinet.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    }, */
    onMutate: async (newHero) => {
      await queryClinet.cancelQueries("super-heroes");
      const previusHeroData = queryClinet.getQueryData("super-heroes");
      queryClinet.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data?.length + 1,
              ...newHero,
            },
          ],
        };
      });
      return {
        previusHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClinet.setQueryData("super-heroes", context.previusHeroData);
    },
    onSettled: () => {
      queryClinet.invalidateQueries("super-heroes");
    },
  });
};
