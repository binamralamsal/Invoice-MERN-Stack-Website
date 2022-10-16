import { axios } from "@/lib/axios";

import { User } from "../types";

export const getUser = (): Promise<User> => {
  return axios.get("/api/auth/info");
};
