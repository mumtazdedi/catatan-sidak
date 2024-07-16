import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useGetPermittionListQuery } from "../../api/permittion.api";
import { useGetUsersQuery } from "../../api/user.api";
import PermittionAcceptanceForm from "./PermittionAcceptanceForm";

export default function PermittionListTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = React.useState({} as any);

  const { data: permittionList, refetch } = useGetPermittionListQuery();
  const { data: userList } = useGetUsersQuery();

  const isVerificator = () => {
    const level = localStorage.getItem("level");
    if (level === "2") {
      return true;
    }

    return false;
  };

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
                {isVerificator() && <Th>Action</Th>}
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
                  {isVerificator() && (
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={() => {
                          setSelectedData(user);
                          onOpen();
                        }}
                      >
                        Response Permittion
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Permittion Acceptance</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="20px">
            <PermittionAcceptanceForm
              onClose={onClose}
              refetch={refetch}
              selectedData={selectedData}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
