import { Paper, Title, Text, Container } from "@mantine/core";

import { LoginForm } from "..//components/LoginForm";

export const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="md" align="center" mt={5} weight="bold">
        Invoice App
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
};
