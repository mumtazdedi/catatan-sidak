import React from "react";
import { useForm } from "react-hook-form";
import { IReqUserVerificator } from "../../interfaces";
import { useAddUserVerificatorMutation } from "../../api/user.api";
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

type Props = {
  onClose: () => void;
  refetch: () => void;
};

export default function AddUserVerificatorForm({ onClose, refetch }: Props) {
  const [show, setShow] = React.useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IReqUserVerificator>({
    mode: "onChange",
  });

  const [addVerificator] = useAddUserVerificatorMutation();

  const handleClick = () => setShow(!show);

  const onSubmit = async (data: IReqUserVerificator) => {
    await addVerificator(data)
      .then((data) => {
        if (data?.data?.status === true) {
          toast({
            title: "User berhasil ditambahkan.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch();
          onClose();
        } else {
          toast({
            title: "User gagal ditambahkan.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
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

  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              {...register("email", {
                required: "This is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
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
            width="100%"
            type="submit"
            colorScheme="teal"
          >
            Add User Verificator
          </Button>
        </Stack>
      </form>
    </div>
  );
}
