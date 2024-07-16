import { IReqAccepPermittion, IResPermittionList } from "../interfaces";
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
  }),
});

export const { useGetPermittionListQuery, usePermittionAcceptanceMutation } =
  permittionApi;
