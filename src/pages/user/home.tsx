import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PermittionUserList from "../../sections/permittion-list/PermittionUserList";

export default function UserHome() {
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
            <TabPanel>{/* <PermittionListTable /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
