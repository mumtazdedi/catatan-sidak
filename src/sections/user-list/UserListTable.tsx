import React from "react";
import {
  useGetUsersQuery,
  usePromoteTobeVerificatorMutation,
  useVerifyUserMutation,
} from "../../api/user.api";
import {
  Button,
  Card,
  Flex,
  IconButton,
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
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddUserVerificatorForm from "./AddUserVerificatorForm";
import ResetPasswordUserForm from "./ResetPasswordUserForm";
import { EditIcon } from "@chakra-ui/icons";
import { FaCheckCircle, FaEdit, FaKey, FaTrash } from "react-icons/fa";

export default function UserListTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAdmin = () => {
    const level = localStorage.getItem("level");
    if (level === "1") {
      return true;
    }

    return false;
  };

  const isVerificator = () => {
    const level = localStorage.getItem("level");
    if (level === "2") {
      return true;
    }

    return false;
  };

  const {
    isOpen: isUserVerificatorOpen,
    onOpen: onUserVerificatorOpen,
    onClose: onUserVerificatorClose,
  } = useDisclosure();

  const {
    isOpen: isResetPasswordOpen,
    onOpen: onResetPasswordOpen,
    onClose: onResetPasswordClose,
  } = useDisclosure();

  const {
    isOpen: isVerifyUserOpen,
    onOpen: onVerifyUserOpen,
    onClose: onVerifyUserClose,
  } = useDisclosure();

  const toast = useToast();

  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const { data: userList, refetch } = useGetUsersQuery();

  const [promoteUser] = usePromoteTobeVerificatorMutation();

  const [verifyUser] = useVerifyUserMutation();

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
          refetch();
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

  const handleVerifyUser = async (userId: number) => {
    try {
      await verifyUser({
        id: userId,
      })
        .unwrap()
        .then(() => {
          toast({
            title: "User berhasil diverifikasi.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch();
          onVerifyUserClose();
        });
    } catch (error) {
      toast({
        title: "User gagal diverifikasi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      {isAdmin() && (
        <Button mb="12px" onClick={onUserVerificatorOpen} colorScheme="teal">
          Add User Verificator
        </Button>
      )}
      <Card>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Level</Th>
                <Th>is Verified</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList?.data?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.level}</Td>
                  <Td>{user.isVerified ? "Yes" : "No"}</Td>
                  <Td>
                    <Flex gap="6px">
                      {isAdmin() && (
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
                      )}

                      {isAdmin() && (
                        <Tooltip label="Reset Password" aria-label="A tooltip">
                          <IconButton
                            aria-label="Reset Password"
                            onClick={() => {
                              setSelectedId(user.id);
                              onResetPasswordOpen();
                            }}
                            size="sm"
                            icon={<FaKey />}
                            colorScheme="red"
                          />
                        </Tooltip>
                      )}

                      {isVerificator() && (
                        <Tooltip label="Verify User" aria-label="A tooltip">
                          <IconButton
                            aria-label="Verify User"
                            onClick={() => {
                              setSelectedId(user.id);
                              onVerifyUserOpen();
                            }}
                            size="sm"
                            icon={<FaCheckCircle />}
                            colorScheme="green"
                          />
                        </Tooltip>
                      )}
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

      <Modal isOpen={isVerifyUserOpen} onClose={onVerifyUserClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verifikasi User Ini?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin verifikasi user ini?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleVerifyUser(selectedId!);
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

      <Modal isOpen={isResetPasswordOpen} onClose={onResetPasswordClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <ResetPasswordUserForm
              onClose={onResetPasswordClose}
              refetch={refetch}
              id={selectedId!}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
