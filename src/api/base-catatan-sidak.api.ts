// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/access-token";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = getAccessToken();

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": headers?.["Content-Type"] || "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseCatatanSidakApi = createApi({
  reducerPath: "catatanSidakApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_API_CATATAN_SIDAK_URL || "",
  }),
  endpoints: () => ({}),
});
