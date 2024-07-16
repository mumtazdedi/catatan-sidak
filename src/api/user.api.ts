import { IReqPromoteVerificator, IResUserList } from "../interfaces";
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
  }),
});

export const { useGetUsersQuery, usePromoteTobeVerificatorMutation } = userApi;
