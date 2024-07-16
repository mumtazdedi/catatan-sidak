import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { authAdminLogout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { setSession } from "../utils/auth-utils";

export default function Header(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const route = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    await authAdminLogout()
      .then(() => {
        route("/login");
        setSession(null);
        toast({
          title: "Logout berhasil.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onLogoutClose();
      })
      .catch(() => {
        toast({
          title: "Logout gagal.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={3}
        bg="teal.500"
        color="white"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h3" size="md" letterSpacing={"tighter"}>
            Catatan Sidak
          </Heading>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            onClick={() => {
              onLogoutOpen();
            }}
          >
            Logout
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah Anda yakin ingin logout?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleLogout();
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
