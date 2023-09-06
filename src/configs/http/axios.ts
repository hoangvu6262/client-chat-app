import axios from "axios";
import { BASE_URL } from "../constant/apiUrl";

export const apiClient = () => {
  const axiosHttp = axios.create({
    baseURL: BASE_URL,
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const interceptedConfig = config;
      // if (jwtHelpers.getAccessToken()) {
      //     interceptedConfig.headers = {
      //         Authorization: `Bearer ${jwtHelpers.getAccessToken()}`,
      //     };
      // }
      // interceptedConfig.headers["Authorization"] =
      //   "Bearer " + (await getToken());
      return interceptedConfig;
    },
    function interceptError(error) {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    function intercept(response) {
      return response;
    },
    function interceptError(error) {
      // const originalRequest = error.config;

      switch (error.response.status) {
        case 403:
          // history.push("/403");
          return Promise.reject(error);
        case 401:
          // history.push("/");
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );

  return axiosHttp;
};
