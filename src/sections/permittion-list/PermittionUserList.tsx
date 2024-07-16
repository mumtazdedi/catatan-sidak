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
import React from "react";
import PermittionForm from "./PermittionForm";
import {
  useCancelPermittionUserMutation,
  useDeletePermittionUserMutation,
  useGetPermttionUserListQuery,
} from "../../api/permittion.api";
import { FaEdit, FaRecycle, FaTrash } from "react-icons/fa";

export default function PermittionUserList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [selectedId, setSelectedId] = React.useState("");
  const [selectedData, setSelectedData] = React.useState({} as any);
  const [cancelPermittion] = useCancelPermittionUserMutation();
  const [deletePermittion] = useDeletePermittionUserMutation();

  const { data: permittionList, refetch } = useGetPermttionUserListQuery();

  const handleCancelPermittion = async (id: string) => {
    await cancelPermittion(id)
      .then((data) => {
        if (data?.data?.status === true) {
          toast({
            title: "Permittion has been canceled.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch();
          onCancelClose();
        }
      })
      .catch(() => {
        toast({
          title: "Permittion failed to cancel.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDeletePermittion = async (id: string) => {
    await deletePermittion(id)
      .then((data) => {
        if (data?.data?.status === true) {
          toast({
            title: "Permittion has been deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch();
          onDeleteClose();
        }
      })
      .catch(() => {
        toast({
          title: "Permittion failed to delete.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

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
                      <Tooltip label="Edit Permittion" aria-label="A tooltip">
                        <IconButton
                          aria-label="Edit Permittion"
                          onClick={() => {
                            setSelectedData(user);
                            setSelectedId(user.id.toString());
                            onEditOpen();
                          }}
                          size="sm"
                          icon={<FaEdit />}
                          colorScheme="yellow"
                        />
                      </Tooltip>

                      <Tooltip label="Cancel Permittion" aria-label="A tooltip">
                        <IconButton
                          aria-label="Cancel Permittion"
                          onClick={() => {
                            setSelectedId(user.id.toString());
                            onCancelOpen();
                          }}
                          size="sm"
                          icon={<FaRecycle />}
                          colorScheme="orange"
                        />
                      </Tooltip>

                      <Tooltip label="Delete Permittion" aria-label="A tooltip">
                        <IconButton
                          aria-label="Delete Permittion"
                          onClick={() => {
                            setSelectedId(user.id.toString());
                            onDeleteOpen();
                          }}
                          size="sm"
                          icon={<FaTrash />}
                          colorScheme="red"
                        />
                      </Tooltip>
                      {/* {isAdmin() && (
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

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Permittion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <PermittionForm
              onClose={onEditClose}
              refetch={refetch}
              mode="edit"
              data={selectedData}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCancelOpen} onClose={onCancelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Permittion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Text>Are you sure you want to cancel this permittion?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCancelClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleCancelPermittion(selectedId!);
              }}
              colorScheme="teal"
            >
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Permittion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Text>Are you sure you want to delete this permittion?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleDeletePermittion(selectedId!);
              }}
              colorScheme="teal"
            >
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
