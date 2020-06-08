import axios from "../core/axios";

export const API = {
  getData: async (data) => axios.post("/db/getData", data),
};
