import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IPermittion, IReqAccepPermittion } from "../../interfaces";
import { usePermittionAcceptanceMutation } from "../../api/permittion.api";

type Props = {
  onClose: () => void;
  refetch: () => void;
  selectedData: IPermittion;
};

export default function PermittionAcceptanceForm({
  onClose,
  refetch,
  selectedData,
}: Props) {
  const toast = useToast();
  const verificatorId = localStorage.getItem("id");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IReqAccepPermittion>({
    mode: "onChange",
    defaultValues: {
      userId: selectedData.userId,
      permittionId: selectedData.id,
      verificatorId: parseInt(verificatorId!),
    },
  });

  const [permittionAcceptance] = usePermittionAcceptanceMutation();

  const onSubmit = async (data: IReqAccepPermittion) => {
    await permittionAcceptance(data)
      .then((data) => {
        if (data?.data?.status === true) {
          toast({
            title: "Permittion berhasil diterima.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          refetch();
          onClose();
        } else {
          toast({
            title: "Permittion gagal diterima.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(() => {
        toast({
          title: "Permittion gagal diterima.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.comment}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input
            id="comment"
            placeholder="Comment"
            {...register("comment", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.comment && errors.comment.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.isAccepted}>
          <FormLabel htmlFor="isAccepted">Is Accepted</FormLabel>
          <Checkbox
            id="isAccepted"
            {...register("isAccepted", {
              required: "This is required",
            })}
          />
        </FormControl>

        <Button
          isLoading={isSubmitting}
          type="submit"
          colorScheme="teal"
          w="100%"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
