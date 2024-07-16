import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UserListTable from "../../sections/user-list/UserListTable";
import PermittionListTable from "../../sections/permittion-list/PermittionListTable";

export default function VerificatorHome() {
  return (
    <DashboardLayout>
      <Box p="12px">
        <Tabs>
          <TabList>
            <Tab>User List</Tab>
            <Tab>Permittion List</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <UserListTable />
            </TabPanel>
            <TabPanel>
              <PermittionListTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
