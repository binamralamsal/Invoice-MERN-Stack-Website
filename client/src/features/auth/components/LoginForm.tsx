import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useForm } from "react-hook-form";
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

  const handleFormSubmit = async (data: LoginCredentialsDTO) => {
    const response = await login(data);

    if (!response) return;
    storage.setToken(response.token);
    navigate("/");
    showNotification({
      icon: <IconCheck size={16} />,
      color: "teal",
      title: "Logged in successfully",
      message: "Explore the dashboard",
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextInput
        label="Email"
        type="email"
        placeholder="you@website.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button fullWidth mt="xl" type="submit" loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};
