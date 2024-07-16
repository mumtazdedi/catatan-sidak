import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IReqPermittionUser } from "../../interfaces";
import { useAddPermittionUserMutation } from "../../api/permittion.api";

type Props = {
  onClose: () => void;
  refetch: () => void;
};

export default function PermittionForm({ onClose, refetch }: Props) {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IReqPermittionUser>({
    mode: "onChange",
  });

  const [addPermittion] = useAddPermittionUserMutation();

  const onSubmit = async (data: IReqPermittionUser) => {
    await addPermittion(data)
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.subject}>
            <FormLabel htmlFor="name">Subject</FormLabel>
            <Input
              id="subject"
              placeholder="subject"
              {...register("subject", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.subject && errors.subject.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="name">Description</FormLabel>
            <Input
              id="description"
              placeholder="description"
              {...register("description", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            width="100%"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
