import axios from "axios";
import { BASE_URL } from "../constant/apiUrl";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
