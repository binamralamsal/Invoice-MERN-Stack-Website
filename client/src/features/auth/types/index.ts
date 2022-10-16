export type User = {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export type UserResponse = {
  userId: string;
  token: string;
};
