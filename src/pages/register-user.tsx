import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import RegisterForm from "../sections/register/RegisterForm";

export default function RegisterUser() {
  return (
    <Container>
      <Center h="100vh">
        <Card>
          <CardHeader>
            <Heading size="md">Register User Biasa</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="4">
              <RegisterForm />
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
}
