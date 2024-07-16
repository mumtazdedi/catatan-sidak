import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import LoginForm from "../sections/login/LoginForm";

export default function Login() {
  const [tabIndex, setTabIndex] = React.useState("0");
  return (
    <Container>
      <Center h="100vh">
        <Card>
          <CardHeader>
            <Heading size="md">Login Sebagai</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="4">
              <Tabs>
                <TabList>
                  <Tab>Admin</Tab>
                  <Tab>Verifikator</Tab>
                  <Tab>Client</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <LoginForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
}
