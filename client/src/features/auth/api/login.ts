import { UserResponse } from "@/features/auth";
import { axios } from "@/lib/axios";

import { LoginCredentialsDTO } from "../validators";

export const login = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post("/api/auth/login", data);
};
