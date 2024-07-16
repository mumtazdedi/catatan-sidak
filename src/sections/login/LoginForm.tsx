import React from "react";
import { useForm } from "react-hook-form";
import { IReqLoginAdmin } from "../../interfaces";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { authAdminLogin } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { setSession } from "../../utils/auth-utils";

export default function LoginForm() {
  const [show, setShow] = React.useState(false);
  const router = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IReqLoginAdmin>({
    mode: "onChange",
  });

  const handleClick = () => setShow(!show);
  const onSubmit = async (data: IReqLoginAdmin) => {
    await authAdminLogin(data)
      .then((res) => {
        setSession(res.access_token);
        toast({
          title: "Login sucessfully.",
          description: "You're logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router("/");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Login failed.",
          description: "Please check your email and password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          isInvalid={errors.email && errors.email.type === "required"}
        >
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              minW="300px"
              id="password"
              placeholder="password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
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

        <Button
          width="100%"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}
