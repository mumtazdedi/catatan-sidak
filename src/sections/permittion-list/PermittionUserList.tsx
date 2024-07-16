import {
  Button,
  Card,
  Flex,
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
import PermittionForm from "./PermittionForm";
import { useGetPermttionUserListQuery } from "../../api/permittion.api";

export default function PermittionUserList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: permittionList, refetch } = useGetPermttionUserListQuery();

  return (
    <>
      <Button mb="12px" onClick={onOpen}>
        Add Permittion
      </Button>

      <Card>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {permittionList?.data?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.subject}</Td>
                  <Td>{user.description}</Td>
                  <Td>
                    <Flex gap="6px">
                      ok
                      {/* {isAdmin() && (
                        <Tooltip
                          label="Jadikan Verifikator"
                          aria-label="A tooltip"
                        >
                          <IconButton
                            aria-label="Jadikan Verifikator"
                            onClick={() => {
                              setSelectedId(user.id);
                              onOpen();
                            }}
                            size="sm"
                            icon={<FaEdit />}
                            colorScheme="yellow"
                          />
                        </Tooltip>
                      )} */}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Permittion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <PermittionForm onClose={onClose} refetch={refetch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
