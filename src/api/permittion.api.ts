import { IResPermittionList } from "../interfaces";
import { baseCatatanSidakApi } from "./base-catatan-sidak.api";

export const permittionApi = baseCatatanSidakApi.injectEndpoints({
  endpoints: (build) => ({
    getPermittionList: build.query<IResPermittionList, void>({
      query: () => ({
        url: "/api/read-permittion",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPermittionListQuery } = permittionApi;
