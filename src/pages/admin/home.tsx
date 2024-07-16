import DashboardLayout from "../../layouts/DashboardLayout";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UserListTable from "../../sections/user-list/UserListTable";

export default function Home() {
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
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
