import {
  IReqAccepPermittion,
  IReqPermittionUser,
  IResPermittionList,
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
    getPermttionUserList: build.query<IResPermittionList, void>({
      query: () => ({
        url: "/api/permittion",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPermittionListQuery,
  usePermittionAcceptanceMutation,
  useAddPermittionUserMutation,
  useGetPermttionUserListQuery,
} = permittionApi;
