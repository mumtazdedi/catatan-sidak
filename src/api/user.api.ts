import {
  IReqPromoteVerificator,
  IReqUserPassword,
  IReqUserVerificator,
  IResUserList,
  IUser,
} from "../interfaces";
import { baseCatatanSidakApi } from "./base-catatan-sidak.api";

const userApi = baseCatatanSidakApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IResUserList, void>({
      query: () => ({
        url: "/api/read-user",
        method: "GET",
      }),
    }),
    promoteTobeVerificator: builder.mutation<
      IResUserList,
      IReqPromoteVerificator
    >({
      query: (data) => ({
        url: `/api/promote-verificator`,
        method: "PUT",
        data,
      }),
    }),
    addUserVerificator: builder.mutation<any, IReqUserVerificator>({
      query: (data) => ({
        url: `/api/add-verificator`,
        method: "POST",
        data,
      }),
    }),
    resetPassword: builder.mutation<any, IReqUserPassword>({
      query: (data) => ({
        url: `/api/user-updatepass/${data.id}`,
        method: "POST",
        data: {
          password: data.password,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePromoteTobeVerificatorMutation,
  useAddUserVerificatorMutation,
  useResetPasswordMutation,
} = userApi;
