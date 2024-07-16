import type { Column } from "@tanstack/react-table";

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  isVerified: number;
  level: number;
  created_at: string;
}

export interface IReqLoginAdmin {
  email: string;
  password: string;
}

export interface IResLoginAdmin {
  status: boolean;
  message: string;
  access_token: string;
  token_type: string;
  data: IUser;
}

export interface IResUserList {
  status: boolean;
  message: string;
  data: IUser[];
}

export interface IReqPromoteVerificator {
  id: number;
}

export interface IReqVerifyUser {
  id: number;
}

export interface IPermittion {
  id: number;
  userId: number;
  subject: string;
  description: string;
  isApplied: number;
  created_at: string;
  updated_at: string;
}

export interface IResPermittionList {
  status: boolean;
  message: string;
  data: IPermittion[];
}

export interface IReqUserVerificator {
  name: string;
  email: string;
  password: string;
}

export interface IResUserVerificator {
  status: boolean;
  message: string;
}

export interface IReqUserPassword {
  id: number;
  password: string;
}

export interface IReqAccepPermittion {
  verificatorId: number;
  userId: number;
  permittionId: number;
  comment: string;
  isAccepted: boolean;
}

export interface IReqRegisterUser {
  name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface IResRegisterUser {
  status: boolean;
  message: string;
  access_token: string;
  token_type: string;
  data: IUser;
}

export interface IReqPermittionUser {
  id?: string;
  subject: string;
  description: string;
}
