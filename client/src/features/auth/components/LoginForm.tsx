import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import storage from "@/utils/storage";

import { login } from "../api/login";
import { loginValidator, LoginCredentialsDTO } from "../validators";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentialsDTO>({ resolver: zodResolver(loginValidator), mode: "all" });

  const navigate = useNavigate();

  const handleFormSubmit: SubmitHandler<LoginCredentialsDTO> = async (data) => {
    const response = await login(data);

    if (!response) return;
    storage.setToken(JSON.stringify(response));
    navigate("/");
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextInput
        label="Email"
        type="email"
        placeholder="you@mantine.dev"
        {...register("email")}
        error={errors.email?.message ? (errors.email?.message as string) : null}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        {...register("password")}
        error={errors.password?.message ? (errors.password?.message as string) : null}
      />
      <Button fullWidth mt="xl" type={"submit"} loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};
