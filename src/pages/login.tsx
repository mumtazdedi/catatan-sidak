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
            <Stack
              // divider={<StackDivider />}
              spacing="4"
            >
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
              {/* <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box> */}
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
}
