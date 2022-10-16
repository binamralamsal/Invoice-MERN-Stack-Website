import { UserResponse } from "@/features/auth";
import { axios } from "@/lib/axios";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const login = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post("/api/auth/login", data);
};
