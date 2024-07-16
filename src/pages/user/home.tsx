import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PermittionUserList from "../../sections/permittion-list/PermittionUserList";
import ResetPasswordUserForm from "../../sections/user-list/ResetPasswordUserForm";

export default function UserHome() {
  const userId = localStorage.getItem("id");

  return (
    <DashboardLayout>
      <Box p="12px">
        <Tabs>
          <TabList>
            <Tab>Permittion List</Tab>
            <Tab>Account</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PermittionUserList />
            </TabPanel>
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Update Password</Heading>
                </CardHeader>

                <CardBody>
                  <Stack spacing="4">
                    <ResetPasswordUserForm id={parseInt(userId!)} />
                  </Stack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
