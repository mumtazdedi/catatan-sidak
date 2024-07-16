import { IReqLoginAdmin, IResLoginAdmin } from "../interfaces";
import { getAccessToken } from "../utils/access-token";
import axiosInstance from "../utils/axios";
import { baseCatatanSidakApi } from "./base-catatan-sidak.api";

export const authAdminLogin = async (data: IReqLoginAdmin) => {
  const response = await axiosInstance.post<IResLoginAdmin>("/api/login", data);
  return response.data;
};

export const authAdminLogout = baseCatatanSidakApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLogoutMutation } = authAdminLogout;
