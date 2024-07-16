import React from "react";
import {
  useGetUsersQuery,
  usePromoteTobeVerificatorMutation,
} from "../../api/user.api";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddUserVerificatorForm from "./AddUserVerificatorForm";

export default function UserListTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isUserVerificatorOpen,
    onOpen: onUserVerificatorOpen,
    onClose: onUserVerificatorClose,
  } = useDisclosure();

  const toast = useToast();

  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const { data: userList, refetch } = useGetUsersQuery();

  const [promoteUser] = usePromoteTobeVerificatorMutation();

  const handlePromoteUser = async (userId: number) => {
    try {
      await promoteUser({
        id: userId,
      })
        .unwrap()
        .then(() => {
          toast({
            title: "User berhasil diubah menjadi verifikator.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        });
    } catch (error) {
      toast({
        title: "User gagal diubah menjadi verifikator.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button mb="12px" onClick={onUserVerificatorOpen}>
        Add User Verificator
      </Button>
      <Card>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Level</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList?.data?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.level}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setSelectedId(user.id);
                        onOpen();
                      }}
                      size="sm"
                    >
                      Jadikan Verifikator
                    </Button>
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
          <ModalHeader>Ubah User Menjadi Verifikator?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Apakah anda yakin ingin mengubah user ini menjadi verifikator?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handlePromoteUser(selectedId!);
              }}
              colorScheme="teal"
            >
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUserVerificatorOpen} onClose={onUserVerificatorClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User Verificator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <AddUserVerificatorForm
              onClose={onUserVerificatorClose}
              refetch={refetch}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
