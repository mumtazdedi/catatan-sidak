import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import LoginForm from "../sections/login/LoginForm";

export default function Login() {
  return (
    <Container>
      <Center h="100vh">
        <Card>
          <CardHeader>
            <Heading size="md">Login Sebagai User/Verifikator/Admin</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="4">
              <LoginForm />
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
}
