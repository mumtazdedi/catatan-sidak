import {
  IReqAccepPermittion,
  IReqPermittionUser,
  IResPermittionList,
  IResPermittionStatus,
} from "../interfaces";
import { baseCatatanSidakApi } from "./base-catatan-sidak.api";

export const permittionApi = baseCatatanSidakApi.injectEndpoints({
  endpoints: (build) => ({
    getPermittionList: build.query<IResPermittionList, void>({
      query: () => ({
        url: "/api/read-permittion",
        method: "GET",
      }),
    }),
    permittionAcceptance: build.mutation<any, IReqAccepPermittion>({
      query: (data) => ({
        url: `/api/accept-permittion`,
        method: "POST",
        data,
      }),
    }),
    addPermittionUser: build.mutation<any, IReqPermittionUser>({
      query: (data) => ({
        url: `/api/permittion`,
        method: "POST",
        data,
      }),
    }),
    updatePermittionUser: build.mutation<any, IReqPermittionUser>({
      query: (data) => ({
        url: `/api/permittion/${data.id}`,
        method: "PUT",
        data,
      }),
    }),
    getPermttionUserList: build.query<IResPermittionList, void>({
      query: () => ({
        url: "/api/permittion",
        method: "GET",
      }),
    }),
    cancelPermittionUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/api/cancel/${id}`,
        method: "POST",
      }),
    }),
    deletePermittionUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/api/permittion/${id}`,
        method: "DELETE",
      }),
    }),
    getPermittionStatus: build.query<IResPermittionStatus, string>({
      query: (id) => ({
        url: `/api/permittion/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPermittionListQuery,
  usePermittionAcceptanceMutation,
  useAddPermittionUserMutation,
  useUpdatePermittionUserMutation,
  useGetPermttionUserListQuery,
  useCancelPermittionUserMutation,
  useDeletePermittionUserMutation,
  useGetPermittionStatusQuery,
  useLazyGetPermittionStatusQuery,
} = permittionApi;
