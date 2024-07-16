import { IReqLoginAdmin, IResLoginAdmin } from "../interfaces";
import axiosInstance from "../utils/axios";

export const authAdminLogin = async (data: IReqLoginAdmin) => {
  const response = await axiosInstance.post<IResLoginAdmin>("/api/login", data);
  return response.data;
};

export const authAdminLogout = async () => {
  const response = await axiosInstance.post("/api/logout");
  return response.data;
};
