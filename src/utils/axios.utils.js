import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // Optionally catch errors and add additional logging here
    // Example: Status code is 404
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
