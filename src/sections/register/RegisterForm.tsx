import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IReqRegisterUser } from "../../interfaces";
import { useRegisterUserMutation } from "../../api/user.api";
import { setSession } from "../../utils/auth-utils";

export default function RegisterForm() {
  const [show, setShow] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const router = useNavigate();
  const toast = useToast();

  const [registerUser] = useRegisterUserMutation();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IReqRegisterUser>({
    mode: "onChange",
  });

  const handleClick = () => setShow(!show);
  const handleClickRePassword = () => setShowRePassword(!showRePassword);

  const onSubmit = async (data: IReqRegisterUser) => {
    await registerUser(data)
      .unwrap()
      .then((res) => {
        setSession(res?.access_token || "");
        localStorage.setItem("level", res?.data?.level?.toString());
        localStorage.setItem("id", res.data.id.toString());
        toast({
          title: "User berhasil ditambahkan.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router("/user");
      })
      .catch(() => {
        toast({
          title: "User gagal ditambahkan.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              minW="300px"
              id="password"
              placeholder="password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: "This is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.re_password}>
          <FormLabel htmlFor="re_password">Password Confirmation</FormLabel>
          <InputGroup size="md">
            <Input
              minW="300px"
              id="re_password"
              placeholder="re_password"
              type={showRePassword ? "text" : "password"}
              {...register("re_password", {
                required: "This is required",
                validate: (value) =>
                  value === watch("password") || "The passwords do not match",
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickRePassword}>
                {showRePassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.re_password && errors.re_password.message}
          </FormErrorMessage>
        </FormControl>

        <Flex justifyContent="flex-end">
          <Button
            size="sm"
            variant="link"
            sx={{
              textDecoration: "underline",
            }}
            colorScheme="teal"
            onClick={() => router("/login")}
          >
            Sudah punya akun? Masuk disini
          </Button>
        </Flex>

        <Button
          width="100%"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </Stack>
    </form>
  );
}
