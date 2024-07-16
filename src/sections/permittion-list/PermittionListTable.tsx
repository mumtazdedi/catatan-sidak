import {
  Card,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useGetPermittionListQuery } from "../../api/permittion.api";
import { useGetUsersQuery } from "../../api/user.api";

export default function PermittionListTable() {
  const { data: permittionList } = useGetPermittionListQuery();
  const { data: userList } = useGetUsersQuery();

  return (
    <>
      <Card>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>User Id</Th>
                <Th>Name</Th>
                <Th>Subject</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {permittionList?.data?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.userId}</Td>
                  <Td>
                    {userList?.data?.find((u) => u.id === user.userId)?.name}
                  </Td>
                  <Td>{user.subject}</Td>
                  <Td>{user.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
