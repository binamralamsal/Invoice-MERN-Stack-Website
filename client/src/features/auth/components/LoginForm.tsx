import { Button, PasswordInput, TextInput } from "@mantine/core";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

import storage from "@/utils/storage";

import { login } from "../api/login";

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const data = await login({ email: emailValue, password: passwordValue });

    if (!data) return;
    storage.setToken(JSON.stringify(data));
    navigate("/");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextInput
        label="Email"
        ref={emailRef}
        // type="email"
        placeholder="you@mantine.dev"
        // required
      />
      <PasswordInput
        label="Password"
        ref={passwordRef}
        placeholder="Your password"
        // required
        mt="md"
      />
      <Button fullWidth mt="xl" type={"submit"}>
        Sign in
      </Button>
    </form>
  );
};
