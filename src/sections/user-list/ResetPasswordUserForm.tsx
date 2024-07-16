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
import React from "react";
import { useForm } from "react-hook-form";
import { IReqUserPassword } from "../../interfaces";
import { useResetPasswordMutation } from "../../api/user.api";

type Props = {
  onClose?: () => void;
  refetch?: () => void;
  id: number;
};

export default function ResetPasswordUserForm({ onClose, refetch, id }: Props) {
  const [show, setShow] = React.useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IReqUserPassword>({
    mode: "onChange",
  });

  const [resetPassword] = useResetPasswordMutation();

  const handleClick = () => setShow(!show);

  const onSubmit = async (data: IReqUserPassword) => {
    await resetPassword({
      id: id,
      password: data.password,
    })
      .then((data) => {
        if (data?.data?.status === true) {
          toast({
            title: "User berhasil direset password.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch && refetch();
          onClose && onClose();
        } else {
          toast({
            title: "User gagal direset password.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(() => {
        toast({
          title: "User gagal direset password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
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
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
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
            isLoading={isSubmitting}
            type="submit"
            width="100%"
            colorScheme="teal"
          >
            Reset Password
          </Button>
        </Stack>
      </form>
    </div>
  );
}
